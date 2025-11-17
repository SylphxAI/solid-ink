/**
 * Build script for @sylphx/solid-tui using Bun
 * Compiles JSX to Universal Renderer calls instead of DOM calls
 */

import solidBuildPlugin from "./solid-plugin-build";

const result = await Bun.build({
  entrypoints: [
    "./packages/solid-tui/src/index.ts",
    "./packages/solid-tui/src/testing.tsx",
  ],
  outdir: "./packages/solid-tui/dist-bun",
  target: "node",
  format: "esm",
  splitting: false,
  plugins: [solidBuildPlugin],
  external: [
    "solid-js",
    "solid-js/web",
    "solid-js/universal",
    "@opentui/core",
    "ansi-escapes",
    "chalk",
    "cli-cursor",
    "yoga-layout",
  ],
});

if (!result.success) {
  console.error("Build failed:");
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log("✅ Build successful!");
console.log(`Built ${result.outputs.length} files to dist-bun/`);
