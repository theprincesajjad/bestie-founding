import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"));
const css = readFileSync(join(root, "styles.css"));
const js = Buffer.concat([
  readFileSync(join(root, "form.js")),
  readFileSync(join(root, "motion.js"))
]);

const htmlCss = gzipSync(Buffer.concat([html, css]));
const jsGzip = gzipSync(js);

console.log(`html+css gzip: ${htmlCss.length} bytes`);
console.log(`js gzip: ${jsGzip.length} bytes`);

if (htmlCss.length > 80 * 1024) {
  console.error("html+css gzip exceeds 80KB");
  process.exit(1);
}
if (jsGzip.length > 70 * 1024) {
  console.error("js gzip exceeds 70KB");
  process.exit(1);
}

console.log("build ok");
