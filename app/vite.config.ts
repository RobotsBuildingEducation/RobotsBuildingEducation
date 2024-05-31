import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "robots-building-education",
      project: "javascript-react",
    }),
  ],
  build: {
    target: "esnext",
    sourcemap: false,
  },
  assetsInclude: ["**/*.mov", "**/*.mp4"],
  optimizeDeps: {
    exclude: [
      "firebase",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore",
      "firebase/analytics",
    ],
  },
  define: {
    // global: {},
    "process.env": {},
  },

  resolve: {
    alias: {
      url: "url",
      os: "os-browserify",
    },
    extensions: [".js", ".mjs"],
  },
  base: "./",
});
