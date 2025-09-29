import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["axios-extensions"],
    force: true,
  },
  resolve: {
    alias: [
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@api", replacement: path.resolve(__dirname, "src/api") },
      { find: "@elements", replacement: path.resolve(__dirname, "src/elements") },
      { find: "@store", replacement: path.resolve(__dirname, "src/store") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@router", replacement: path.resolve(__dirname, "src/router") },
      { find: "@config", replacement: path.resolve(__dirname, "src/config") },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
    ],
  },
});
