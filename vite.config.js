import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");

  if (!env.VITE_API_URL) {
    console.warn("⚠️ VITE_API_URL is not defined in your .env file!");
  }

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()], // ✅ Tailwind added
      },
    },
  };
});
