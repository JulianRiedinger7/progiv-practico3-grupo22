import dotenv from "dotenv";
import { defineConfig } from "@playwright/test";

dotenv.config({ path: "../../.env" });

const baseURL = process.env.E2E_API_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL,
  },
  webServer: process.env.E2E_API_URL
    ? undefined
    : {
        command: "pnpm start:test",
        url: `${baseURL}/pedidos`,
        reuseExistingServer: false,
        env: {
          SQLITE_DATABASE_PATH: ":memory:",
        },
      },
});

