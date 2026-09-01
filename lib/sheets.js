import { JWT } from "google-auth-library";

/* Appends enquiries to a Google Sheet.
 * ============================================================================
 * Deliberately NOT a copy of the CRM's services/sheetsService.js. Three
 * differences, each for a reason:
 *
 *  1. `values.append` rather than "find the next empty row, then write".
 *     The CRM's read-then-write sequence is not atomic, so it needs a
 *     process-local write mutex to stop two pushes computing the same target
 *     row and overwriting each other. `append` with insertDataOption:
 *     INSERT_ROWS makes Google allocate the row server-side, so concurrent
 *     submissions cannot collide and no mutex is needed.
 *
 *  2. valueInputOption: "RAW", not "USER_ENTERED". The CRM writes data it
 *     controls; this writes whatever a stranger typed into a public form.
 *     Under USER_ENTERED a message beginning "=" is stored as a FORMULA and
 *     evaluated when someone opens the tab — =HYPERLINK() to phish whoever
 *     reads it, =IMPORTXML() to pull the sheet's contents to an external URL.
 *     RAW stores every value as literal text.
 *
 *  3. Credentials from an environment variable, not a file path. This site is
 *     hosted away from the on-prem box and may have no writable filesystem.
 *     A key file path is still accepted so it also works on-prem.
 *
 * Configured entirely by environment, so moving from a personal sheet to a
 * production one is three variables and no code change.
 */

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const HEADERS = [
  "Received",
  "Name",
  "Business",
  "Email",
  "Phone",
  "Team size",
  "Plan",
  "Message",
  "Status",
  "Owner",
  "Notes",
];

/** True when there is enough configuration to attempt a write at all. */
export function sheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SHEETS_LEADS_ID &&
      (process.env.GOOGLE_SHEETS_CREDENTIALS_B64 || process.env.GOOGLE_SHEETS_KEY_PATH),
  );
}

/**
 * Service-account credentials, from a base64 environment variable or a file.
 *
 * Base64 rather than raw JSON because the key contains literal newlines inside
 * the private key, and every hosting dashboard, shell and CI system mangles
 * those differently. Base64 survives all of them.
 */
async function loadCredentials() {
  const b64 = process.env.GOOGLE_SHEETS_CREDENTIALS_B64;
  if (b64) {
    let text;
    try {
      text = Buffer.from(b64, "base64").toString("utf8");
    } catch {
      throw new Error("GOOGLE_SHEETS_CREDENTIALS_B64 is not valid base64");
    }
    try {
      return JSON.parse(text);
    } catch {
      throw new Error("GOOGLE_SHEETS_CREDENTIALS_B64 does not decode to JSON");
    }
  }

  const keyPath = process.env.GOOGLE_SHEETS_KEY_PATH;
  if (!keyPath) throw new Error("No Google Sheets credentials configured");

  const { readFile } = await import("node:fs/promises");
  const { isAbsolute, resolve } = await import("node:path");
  /* turbopackIgnore: the path comes from an env var, so the bundler cannot
     trace it and warns. That is expected: this branch exists for a host with a
     writable filesystem (the on-prem box), and is skipped entirely when
     GOOGLE_SHEETS_CREDENTIALS_B64 is set, which is how this site is deployed. */
  const full = isAbsolute(keyPath) ? keyPath : resolve(/*turbopackIgnore: true*/ process.cwd(), keyPath);
  try {
    return JSON.parse(await readFile(full, "utf8"));
  } catch (err) {
    throw new Error(`Could not read the key file at ${full}: ${err.message}`);
  }
}

let cachedClient = null;
let authProvider = null;

/** Cached for the process lifetime; the library refreshes the token itself. */
async function getAuth() {
  if (cachedClient) return cachedClient;
  const creds = await loadCredentials();
  if (!creds.client_email || !creds.private_key) {
    throw new Error("Credentials are missing client_email or private_key");
  }
  cachedClient = authProvider
    ? authProvider(creds)
    : new JWT({ email: creds.client_email, key: creds.private_key, scopes: SCOPES });
  return cachedClient;
}

async function sheetsFetch(path, init = {}) {
  const auth = await getAuth();
  const { token } = await auth.getAccessToken();
  const res = await fetch(`${SHEETS_API}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    /* 403 here almost always means the sheet was never shared with the service
       account — a valid key with no access. Worth naming, because the message
       Google returns does not make it obvious. */
    const hint =
      res.status === 403
        ? " (is the sheet shared with the service account's client_email?)"
        : "";
    throw new Error(`Sheets API ${res.status}${hint}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

/** The row, in HEADERS order. Status/Owner/Notes are left for your team. */
export function toRow(enquiry) {
  return [
    enquiry.submitted || new Date().toISOString(),
    enquiry.name || "",
    enquiry.business || "",
    enquiry.email || "",
    enquiry.phone || "",
    enquiry.team || "",
    enquiry.plan || "",
    enquiry.message || "",
    "", // Status
    "", // Owner
    "", // Notes
  ];
}

/**
 * Writes the header row if the tab is completely empty.
 *
 * Without this the very first enquiry becomes the header, and the sheet reads
 * as though a lead called "Received" arrived. Checked per cold start, not per
 * request — one extra read on the first write after a deploy.
 */
let headerChecked = false;
async function ensureHeaderRow(spreadsheetId, tab) {
  if (headerChecked) return;
  const range = encodeURIComponent(`${tab}!A1:K1`);
  const existing = await sheetsFetch(`${spreadsheetId}/values/${range}`);
  if (!existing.values || existing.values.length === 0) {
    await sheetsFetch(
      `${spreadsheetId}/values/${range}?valueInputOption=RAW`,
      { method: "PUT", body: JSON.stringify({ values: [HEADERS] }) },
    );
  }
  headerChecked = true;
}

/**
 * Appends one enquiry. Throws on failure — the caller decides what the visitor
 * sees, because only it knows whether another delivery route succeeded.
 */
export async function appendEnquiry(enquiry) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_LEADS_ID;
  const tab = process.env.GOOGLE_SHEETS_LEADS_TAB || "Leads";
  if (!spreadsheetId) throw new Error("GOOGLE_SHEETS_LEADS_ID is not set");

  await ensureHeaderRow(spreadsheetId, tab);

  const range = encodeURIComponent(`${tab}!A:K`);
  const result = await sheetsFetch(
    `${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: "POST", body: JSON.stringify({ values: [toRow(enquiry)] }) },
  );
  return result?.updates?.updatedRange || "appended";
}

/** Test seam — the auth client and header check are process-level caches. */
export function __resetSheetsCache() {
  cachedClient = null;
  authProvider = null;
  headerChecked = false;
}

/**
 * Test seam for the token exchange.
 *
 * google-auth-library talks to Google through gaxios, not globalThis.fetch, so
 * stubbing fetch does NOT intercept the token request — the tests reached the
 * real OAuth endpoint and failed with "account not found". Injecting the auth
 * client is the honest way to test the request we build without inventing a
 * network. Credential loading and validation still run for real; only the
 * token exchange is replaced.
 */
export function __setAuthProvider(fn) {
  authProvider = fn;
  cachedClient = null;
}
