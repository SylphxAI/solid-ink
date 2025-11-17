import { transformAsync } from "@babel/core";
import ts from "@babel/preset-typescript";
import solid from "babel-preset-solid";
import type { BunPlugin } from "bun";

/**
 * Build-time plugin for solid-tui package itself
 * Uses solid-js/universal imports instead of custom moduleName
 */
const solidBuildPlugin: BunPlugin = {
  name: "solid-build-plugin",
  setup: (build) => {
    build.onLoad({ filter: /\.(jsx|tsx)$/ }, async (args) => {
      const { readFile } = await import("node:fs/promises");
      const code = await readFile(args.path, "utf8");

      const transforms = await transformAsync(code, {
        filename: args.path,
        presets: [
          [
            solid,
            {
              generate: "dom",
              // Use DOM mode for building - will import from solid-js/web
              // This is okay because we mark solid-js/web as external
            },
          ],
          [ts, {}],
        ],
      });

      return {
        contents: transforms?.code ?? "",
        loader: "js",
      };
    });
  },
};

export default solidBuildPlugin;
