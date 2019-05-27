import elm from "rollup-plugin-elm";
import { terser } from "rollup-plugin-terser";
import { builtinModules } from "module";
import resolve from "rollup-plugin-node-resolve";

/** @type {import("rollup").RollupOptions} */
const config = {
  input: "src/index.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
    banner: "#!/usr/bin/env node"
  },
  plugins: [
    elm({
      exclude: "elm-stuff/**",
      compiler: {
        optimize: true
      }
    }),
    terser({
      mangle: true,
      compress: {
        pure_funcs: [
          "F2",
          "F3",
          "F4",
          "F5",
          "F6",
          "F7",
          "F8",
          "F9",
          "A2",
          "A3",
          "A4",
          "A5",
          "A6",
          "A7",
          "A8",
          "A9"
        ],
        pure_getters: true,
        keep_fargs: false,
        unsafe_comps: true,
        unsafe: true
      }
    }),
    resolve()
  ],
  external: builtinModules
};

export default config;
