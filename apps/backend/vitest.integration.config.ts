import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/integration/**/*.test.ts", "src/**/*.integration.test.ts"],
    setupFiles: ["./tests/setup/integration.ts"],
    clearMocks: true,
    testTimeout: 10_000,
    hookTimeout: 10_000,
  },
});

