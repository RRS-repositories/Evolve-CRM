import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* This project sits inside the CRM-Finalised repo, which has its own
     package-lock.json at the root. Next walks up looking for a lockfile to
     decide the workspace root, finds that one first, and infers the wrong
     root — which affects module resolution and output file tracing. Pinning
     it to this directory keeps the two projects independent. */
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
