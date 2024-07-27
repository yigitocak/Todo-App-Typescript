import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      outDir: "dist", // Ensure the output directory is set correctly
    },
    define: {
      "process.env": {
        VITE_ENV: env.VITE_ENV,
        DB_HOST: env.DB_HOST,
        DB_PORT: env.DB_PORT,
        DB_NAME: env.DB_NAME,
        DB_USER: env.DB_USER,
        DB_PASSWORD: env.DB_PASSWORD,
      },
    },
  };
});
