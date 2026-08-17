import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html",
  "styles.css",
  "form.js",
  "motion.js",
  "assets/favicon.svg",
  "assets/og.svg",
  "docs/preview-and-blockers.md"
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length) {
  console.error("Missing files:", missing.join(", "));
  process.exit(1);
}

const html = readFileSync(join(root, "index.html"), "utf8");
const published = [
  html,
  readFileSync(join(root, "styles.css"), "utf8"),
  readFileSync(join(root, "form.js"), "utf8"),
  readFileSync(join(root, "motion.js"), "utf8")
].join("\n");

const forbidden = [
  "vote",
  "source publication pending",
  "Founding Builder",
  "Founding Steward",
  "C$5",
  "C$15",
  "C$35",
  "if you fit",
  "We will not take everyone",
  "open-source project",
  "Help steward Bestie in the open",
  "source publication pending"
];

const hits = forbidden.filter((phrase) => published.toLowerCase().includes(phrase.toLowerCase()));
if (hits.length) {
  console.error("Forbidden strings:", hits.join(", "));
  process.exit(1);
}

if (!html.includes("<main id=\"main\"") || !html.includes(":focus-visible") && !readFileSync(join(root, "styles.css"), "utf8").includes(":focus-visible")) {
  console.error("Missing landmark or focus style");
  process.exit(1);
}

console.log("lint ok");
