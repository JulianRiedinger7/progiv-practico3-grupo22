import dotenv from "dotenv";
import { defineConfig } from "@playwright/test";

dotenv.config({ path: "../../.env" });

const apiURL = process.env.E2E_API_URL ?? "http://127.0.0.1:3000";
const webURL = process.env.E2E_WEB_URL ?? "http://127.0.0.1:5173";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: webURL,
    browserName: "chromium",
    headless: true,
  },
  webServer: [
    ...(process.env.E2E_API_URL
      ? []
      : [
          {
            command: "pnpm start:test",
            cwd: "../backend",
            url: `${apiURL}/health`,
            reuseExistingServer: false,
            env: {
              SQLITE_DATABASE_PATH: ":memory:",
            },
          },
        ]),
    ...(process.env.E2E_WEB_URL
      ? []
      : [
          {
            command: "pnpm dev -- --host 127.0.0.1",
            url: webURL,
            reuseExistingServer: false,
            env: {
              VITE_API_URL: apiURL,
            },
          },
        ]),
  ],
});

