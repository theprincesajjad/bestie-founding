import { spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const root = process.cwd();
const outDir = join(root, "artifacts");
const publicDir = "/opt/cursor/artifacts/screenshots";
mkdirSync(outDir, { recursive: true });
if (existsSync("/opt/cursor/artifacts")) mkdirSync(publicDir, { recursive: true });

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png"
};

const server = createServer((req, res) => {
  const path = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  try {
    const file = readFileSync(join(root, decodeURIComponent(path)));
    res.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream" });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

await new Promise((resolve) => server.listen(4174, "127.0.0.1", resolve));

function shot(width, height, name) {
  const dest = join(outDir, name);
  const tmp = `/tmp/${name}`;
  if (existsSync(dest)) rmSync(dest);
  if (existsSync(tmp)) rmSync(tmp);
  const result = spawnSync("timeout", [
    "60",
    "google-chrome-stable",
    "--headless=old",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--user-data-dir=/tmp/bestie-cap-${width}-${Date.now()}`,
    `--window-size=${width},${height}`,
    `--screenshot=${tmp}`,
    "http://127.0.0.1:4174/"
  ], { encoding: "utf8" });
  if (!existsSync(tmp) || statSync(tmp).size < 1000) {
    console.error(result.stderr || result.stdout);
    throw new Error(`chrome failed for ${name} status=${result.status} error=${result.error}`);
  }
  copyFileSync(tmp, dest);
  if (existsSync("/opt/cursor/artifacts")) copyFileSync(dest, join(publicDir, name));
  console.log(`${dest} (${statSync(dest).size} bytes)`);
}

shot(1440, 8800, "desktop-1440.png");
shot(390, 12800, "mobile-390.png");
for (const name of ["desktop-1440.png", "mobile-390.png"]) {
  const dest = join(outDir, name);
  const captures = join(outDir, "captures");
  mkdirSync(captures, { recursive: true });
  copyFileSync(dest, join(captures, name));
}
server.close();
