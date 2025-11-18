import { transformAsync } from "@babel/core";
import ts from "@babel/preset-typescript";
import solid from "babel-preset-solid";
import type { BunPlugin } from "bun";

/**
 * Custom SolidJS plugin for Bun that uses Universal Renderer
 * instead of DOM renderer, making it compatible with Terminal UIs
 */
const solidUniversalPlugin: BunPlugin = {
  name: "solid-universal-plugin",
  setup: (build) => {
    // Transform .jsx and .tsx files
    build.onLoad({ filter: /\.(jsx|tsx)$/ }, async (args) => {
      const { readFile } = await import("node:fs/promises");
      const code = await readFile(args.path, "utf8");

      try {
        const transforms = await transformAsync(code, {
          filename: args.path,
          presets: [
            [
              solid,
              {
                // Use solid-js/universal instead of solid-js/web
                generate: "universal",
                // Import JSX runtime functions from main package
                moduleName: "@sylphx/solid-tui",
              },
            ],
            [ts, {}],
          ],
        });

        return {
          contents: transforms?.code ?? "",
          loader: "js",
        };
      } catch (err) {
        console.error("[solid-plugin] Transform error:", err);
        throw err;
      }
    });
  },
};

export default solidUniversalPlugin;
