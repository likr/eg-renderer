import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/umd.js",
  output: {
    file: "umd/eg-renderer.js",
    format: "umd",
    name: "egRenderer",
  },
  plugins: [resolve()],
};
