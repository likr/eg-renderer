import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "umd/eg-renderer-ogdf.js",
    format: "umd",
    name: "eg-renderer-ogdf",
  },
  plugins: [commonjs(), nodeResolve()],
};
