/**
 * GitHub Pages production build.
 *
 * 1. Runs the normal typecheck + build. Vite emits RELATIVE asset paths
 *    (base "./") and the app uses HashRouter, so the bundle works from any
 *    directory — no repo-name coupling, no white-screen asset 404s.
 * 2. Copies index.html to 404.html — GitHub serves 404.html for unknown
 *    paths; the app boots there and HashRouter resolves the correct view.
 * 3. Writes .nojekyll so Pages serves files as-is (skips Jekyll processing).
 *
 * Usage: npm run build:pages
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
console.log("> Building for GitHub Pages (relative base + 404 fallback)...");
const build = spawnSync(npmCmd, ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
});
if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
writeFileSync(join(dist, ".nojekyll"), "");

console.log("✓ Pages build ready in dist/ — 404.html fallback and .nojekyll written.");
