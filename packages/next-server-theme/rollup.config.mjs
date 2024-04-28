import preserveDirectives from "rollup-plugin-preserve-directives";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
// use terser once everythign works

export default [
  {
    input: ["src/client.ts", "src/server.ts"],
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/cjs/types",
        declarationDir: "dist/cjs/types",
        rootDir: "src"
      }),
      resolve(),
      preserveDirectives(),
      terser(),
      commonjs()
    ],
    onwarn: function (message) {
      if (/"use client"/.test(message)) return;
      console.error(message);
    }
  },
  {
    input: ["src/client.ts", "src/server.ts"],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/esm/types",
        declarationDir: "dist/esm/types",
        rootDir: "src"
      }),
      resolve(),
      preserveDirectives(),
      terser(),
      commonjs()
    ],
    onwarn: function (message) {
      if (/"use client"/.test(message)) return;
      console.error(message);
    }
  },
  {
    input: "dist/esm/types/client.d.ts",
    output: [{ file: "dist/types/client.d.ts", format: "es" }],
    plugins: [dts()]
  },
  {
    input: "dist/esm/types/server.d.ts",
    output: [{ file: "dist/types/server.d.ts", format: "es" }],
    plugins: [dts()]
  },
  {
    input: "src/bin/index.ts",
    output: [{ file: "dist/bin/index.js", format: "es" }],
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/bin",
        declarationDir: "dist/bin",
        rootDir: "src/bin",
        outputToFilesystem: true
      }),
      json(),
      resolve(),
      terser(),
      commonjs()
    ]
  }
];