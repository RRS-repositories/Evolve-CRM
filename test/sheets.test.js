/* Tests for the Google Sheets lead writer.
 *
 * All of these run without a Google account: `fetch` is stubbed, so what is
 * verified is the request WE build — the row order, the encoding, and the two
 * query parameters that stop a public form doing damage.
 *
 * The one thing these cannot prove is that the credentials work and the sheet
 * is shared with the service account. That needs a real key and is the last
 * step before this goes live.
 */

import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import {
  HEADERS,
  toRow,
  appendEnquiry,
  sheetsConfigured,
  __resetSheetsCache,
  __setAuthProvider,
} from "../lib/sheets.js";

const REAL_FETCH = globalThis.fetch;
const ENV_KEYS = [
  "GOOGLE_SHEETS_LEADS_ID",
  "GOOGLE_SHEETS_LEADS_TAB",
  "GOOGLE_SHEETS_CREDENTIALS_B64",
  "GOOGLE_SHEETS_KEY_PATH",
];
let savedEnv;

/* A REAL RSA keypair, generated here and thrown away.
 *
 * A placeholder string does not work: the auth library signs the JWT locally
 * before making any network call, so OpenSSL rejects a fake key with
 * ERR_OSSL_UNSUPPORTED long before the stubbed fetch is reached. Generating a
 * throwaway key means the signing path runs for real and only the network is
 * stubbed. It is discarded when the process exits and grants access to nothing. */
const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});
const FAKE_KEY = {
  client_email: "evolve-site-leads@example.iam.gserviceaccount.com",
  private_key: privateKey,
};

/** Records every Sheets request instead of sending it. */
function stubSheets({ existingHeader = null } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: decodeURIComponent(String(url)),
      method: init.method || "GET",
      body: init.body ? JSON.parse(init.body) : null,
    });
    // The token request the auth library makes before any Sheets call.
    if (String(url).includes("oauth2") || String(url).includes("token")) {
      return new Response(JSON.stringify({ access_token: "stub", expires_in: 3600 }), { status: 200 });
    }
    // The header-row probe.
    if (!String(url).includes(":append") && (init.method || "GET") === "GET") {
      return new Response(JSON.stringify(existingHeader ? { values: [existingHeader] } : {}), { status: 200 });
    }
    return new Response(JSON.stringify({ updates: { updatedRange: "Leads!A2:K2" } }), { status: 200 });
  };
  return calls;
}

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  for (const k of ENV_KEYS) delete process.env[k];
  __resetSheetsCache();
});

afterEach(() => {
  globalThis.fetch = REAL_FETCH;
  for (const [k, v] of Object.entries(savedEnv)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  __resetSheetsCache();
});

function configure() {
  process.env.GOOGLE_SHEETS_LEADS_ID = "test-sheet-id";
  process.env.GOOGLE_SHEETS_LEADS_TAB = "Leads";
  process.env.GOOGLE_SHEETS_CREDENTIALS_B64 = Buffer.from(JSON.stringify(FAKE_KEY)).toString("base64");
  // Only the token exchange is stubbed; credential loading still runs for real.
  __setAuthProvider(() => ({ getAccessToken: async () => ({ token: "stub-token" }) }));
}

const ENQUIRY = {
  name: "Jane Doe",
  business: "Acme Legal",
  email: "jane@acme.test",
  phone: "07700 900123",
  team: "11–25 users",
  plan: "Scale",
  message: "We run 40 agents",
  submitted: "2026-09-01T09:00:00.000Z",
};

// ── The row ────────────────────────────────────────────────────────────────

test("the row matches the header order, column for column", () => {
  const row = toRow(ENQUIRY);
  assert.equal(row.length, HEADERS.length, "a column was added to one and not the other");
  assert.deepEqual(row.slice(0, 8), [
    "2026-09-01T09:00:00.000Z",
    "Jane Doe",
    "Acme Legal",
    "jane@acme.test",
    "07700 900123",
    "11–25 users",
    "Scale",
    "We run 40 agents",
  ]);
  assert.deepEqual(row.slice(8), ["", "", ""], "Status, Owner and Notes are for the team to fill in");
});

test("missing optional fields become empty cells, never undefined", () => {
  const row = toRow({ name: "A", business: "B", email: "c@d.e", phone: "07700900123" });
  assert.ok(row.every((c) => typeof c === "string"), "undefined would shift every later column");
  assert.equal(row[5], "");
  assert.equal(row[6], "");
});

test("a missing timestamp is filled in rather than left blank", () => {
  const row = toRow({ name: "A" });
  assert.ok(!Number.isNaN(Date.parse(row[0])), "Received must always hold a real date");
});

// ── The two settings that matter for a public form ─────────────────────────

test("values are written RAW, so a typed formula cannot execute", async () => {
  configure();
  const calls = stubSheets();
  await appendEnquiry({ ...ENQUIRY, message: '=HYPERLINK("http://evil.example","Click")' });

  const append = calls.find((c) => c.url.includes(":append"));
  assert.match(append.url, /valueInputOption=RAW/,
    "USER_ENTERED would make Sheets evaluate a submitted formula when the tab is opened");
  assert.equal(
    append.body.values[0][7],
    '=HYPERLINK("http://evil.example","Click")',
    "the formula must be sent verbatim, to be stored as text",
  );
});

test("rows are inserted, not overwritten, so concurrent submissions cannot collide", async () => {
  configure();
  const calls = stubSheets();
  await appendEnquiry(ENQUIRY);
  const append = calls.find((c) => c.url.includes(":append"));
  assert.match(append.url, /insertDataOption=INSERT_ROWS/);
  assert.equal(append.method, "POST");
});

test("non-ASCII survives the round trip", async () => {
  configure();
  const calls = stubSheets();
  await appendEnquiry({ ...ENQUIRY, team: "11–25 users", business: "Müller & Fitzgerald" });
  const append = calls.find((c) => c.url.includes(":append"));
  assert.equal(append.body.values[0][5], "11–25 users", "the en-dash must not be mangled");
  assert.equal(append.body.values[0][2], "Müller & Fitzgerald");
});

// ── The header row ─────────────────────────────────────────────────────────

test("an empty tab gets a header row before the first lead", async () => {
  configure();
  const calls = stubSheets({ existingHeader: null });
  await appendEnquiry(ENQUIRY);
  const write = calls.find((c) => c.method === "PUT");
  assert.ok(write, "without this the first enquiry becomes the header row");
  assert.deepEqual(write.body.values[0], HEADERS);
});

test("an existing header is left alone", async () => {
  configure();
  const calls = stubSheets({ existingHeader: HEADERS });
  await appendEnquiry(ENQUIRY);
  assert.equal(calls.filter((c) => c.method === "PUT").length, 0);
});

test("the header is checked once per process, not on every enquiry", async () => {
  configure();
  const calls = stubSheets({ existingHeader: HEADERS });
  await appendEnquiry(ENQUIRY);
  await appendEnquiry(ENQUIRY);
  const probes = calls.filter((c) => c.method === "GET" && !c.url.includes("token"));
  assert.equal(probes.length, 1, "a read on every submission would double the API calls");
});

// ── Configuration ──────────────────────────────────────────────────────────

test("sheetsConfigured is false until BOTH an id and a credential exist", () => {
  assert.equal(sheetsConfigured(), false);
  process.env.GOOGLE_SHEETS_LEADS_ID = "x";
  assert.equal(sheetsConfigured(), false, "an id with no credential must not count as configured");
  process.env.GOOGLE_SHEETS_CREDENTIALS_B64 = "y";
  assert.equal(sheetsConfigured(), true);
});

test("a key path alone also counts as configured, for on-prem hosting", () => {
  process.env.GOOGLE_SHEETS_LEADS_ID = "x";
  process.env.GOOGLE_SHEETS_KEY_PATH = "./key.json";
  assert.equal(sheetsConfigured(), true);
});

test("malformed credentials fail with a message that says what is wrong", async () => {
  process.env.GOOGLE_SHEETS_LEADS_ID = "x";
  process.env.GOOGLE_SHEETS_CREDENTIALS_B64 = Buffer.from("this is not json").toString("base64");
  __setAuthProvider(() => ({ getAccessToken: async () => ({ token: "stub-token" }) }));
  stubSheets();
  await assert.rejects(() => appendEnquiry(ENQUIRY), /does not decode to JSON/);
});

test("credentials missing a private key are refused before any request", async () => {
  process.env.GOOGLE_SHEETS_LEADS_ID = "x";
  process.env.GOOGLE_SHEETS_CREDENTIALS_B64 = Buffer.from(
    JSON.stringify({ client_email: "a@b.c" }),
  ).toString("base64");
  __setAuthProvider(() => ({ getAccessToken: async () => ({ token: "stub-token" }) }));
  stubSheets();
  await assert.rejects(() => appendEnquiry(ENQUIRY), /missing client_email or private_key/);
});

// ── Failure ────────────────────────────────────────────────────────────────

test("a 403 says the likely cause, because Google's message does not", async () => {
  configure();
  globalThis.fetch = async () => new Response("The caller does not have permission", { status: 403 });
  await assert.rejects(
    () => appendEnquiry(ENQUIRY),
    /shared with the service account/,
    "sharing the sheet is the step people miss, so the error should name it",
  );
});

test("an API error propagates rather than reporting a phantom success", async () => {
  configure();
  globalThis.fetch = async () => new Response("backend error", { status: 500 });
  await assert.rejects(() => appendEnquiry(ENQUIRY), /Sheets API 500/);
});
