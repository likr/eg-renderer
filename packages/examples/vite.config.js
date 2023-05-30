import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        "html-demo": resolve(__dirname, "demos/html-demo/index.html"),
      },
    },
  },
});
