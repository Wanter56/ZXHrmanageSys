import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@api", replacement: path.resolve(__dirname, "src/api") },
      { find: "@elements", replacement: path.resolve(__dirname, "src/elements") },
      { find: "@store", replacement: path.resolve(__dirname, "src/store") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@common", replacement: path.resolve(__dirname, "src/common") },
      { find: "@router", replacement: path.resolve(__dirname, "src/router") },
    ],
  },
});
