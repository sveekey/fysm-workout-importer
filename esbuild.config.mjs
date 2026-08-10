import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/main.js"],
  bundle: true,
  external: ["obsidian"],
  format: "cjs",
  platform: "browser",
  target: "es2020",
  outfile: "main.js",
  sourcemap: false,
  minify: false,
  logLevel: "info"
});
