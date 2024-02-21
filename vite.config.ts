import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "/",
    plugins: [react(), viteTsconfigPaths()],
    build: {
      outDir: "build",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    server: {
      open: true,
      port: 3000,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      css: true,
      reporters: ["verbose"],
      coverage: {
        reporter: ["text", "json", "html"],
        include: ["src/**/*"],
        exclude: [],
      },
    },
  };
});
