import { chromium, defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 15_000,
  expect: { timeout: 3_000 },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://127.0.0.1:3200",
    navigationTimeout: 10_000,
    actionTimeout: 5_000,
    trace: "on-first-retry"
  },
  webServer: {
    command: "npm run start -- -p 3200 --hostname 127.0.0.1",
    url: "http://127.0.0.1:3200",
    reuseExistingServer: false,
    timeout: 30_000
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        launchOptions: {
          executablePath: chromium.executablePath()
        }
      }
    }
  ]
});

