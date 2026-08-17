import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const root = process.cwd();
const outDir = join(root, "artifacts");
const publicDir = "/opt/cursor/artifacts/screenshots";
mkdirSync(outDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

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

await new Promise((resolve) => server.listen(4173, "127.0.0.1", resolve));
const base = "http://127.0.0.1:4173/";

const chrome = spawn("google-chrome-stable", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--hide-scrollbars",
  "--remote-debugging-port=9333",
  "--user-data-dir=/tmp/bestie-chrome",
  base
], { stdio: "pipe" });

async function waitForDevtools() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const pages = await fetch("http://127.0.0.1:9333/json/list").then((r) => r.json());
      if (pages.length) return pages[0];
    } catch {}
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error("Chrome DevTools did not start");
}

const page = await waitForDevtools();
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve);
  ws.addEventListener("error", reject);
});

let nextId = 0;
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const onMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id !== id) return;
      ws.removeEventListener("message", onMessage);
      if (data.error) reject(new Error(data.error.message));
      else resolve(data.result);
    };
    ws.addEventListener("message", onMessage);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await send("Page.enable");
await send("Runtime.enable");

async function capture(width, height, name, mobile) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height
  });
  await send("Page.navigate", { url: base });
  await send("Page.reload", { ignoreCache: true });
  await new Promise((r) => setTimeout(r, 900));
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true
  });
  const dest = join(outDir, name);
  writeFileSync(dest, Buffer.from(shot.data, "base64"));
  copyFileSync(dest, join(publicDir, name));
  console.log(dest);
}

await capture(1440, 900, "desktop-1440.png", false);
await capture(390, 844, "mobile-390.png", true);

ws.close();
chrome.kill("SIGTERM");
server.close();
if (!existsSync(join(outDir, "desktop-1440.png")) || !existsSync(join(outDir, "mobile-390.png"))) {
  process.exit(1);
}
