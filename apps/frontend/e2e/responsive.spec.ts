import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 375, height: 812 } });

test("el menú no tiene desplazamiento horizontal en móvil", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Cafetería Origen" })).toBeVisible();

  const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);

  expect(documentWidth).toBeLessThanOrEqual(375);
});
