import { expect, test } from '@playwright/test';

test('recorrido completo: elegir café, agregar pastelería, confirmar y seguir el pedido', async ({
  page,
}) => {
  await page.goto('/?mesa=4');

  await expect(page.getByRole('heading', { name: 'Cafetería Origen' })).toBeVisible();
  await expect(page.getByText('Mesa 4')).toBeVisible();

  await page.getByRole('button', { name: 'Expreso' }).click();
  await page.getByRole('button', { name: 'Pocillo' }).click();
  await page.getByRole('button', { name: 'Brasil' }).click();

  await expect(page.getByRole('heading', { name: 'Espresso pocillo brasil' })).toBeVisible();
  await page.getByRole('button', { name: 'Agregar al pedido' }).first().click();

  const pasteleria = page.getByRole('region', { name: 'Pastelería' });
  await expect(pasteleria).toBeVisible();
  await pasteleria
    .locator('article', { hasText: 'muffin chocolate' })
    .getByRole('button', { name: 'Agregar al pedido' })
    .click();

  const carrito = page.getByRole('region', { name: 'Tu pedido' });
  await expect(carrito.getByText('Espresso pocillo brasil')).toBeVisible();
  await expect(carrito.getByText('Pasteleria muffin chocolate')).toBeVisible();
  await expect(carrito.getByText(/Subtotal del pedido: \$7\.520/)).toBeVisible();

  await page.getByRole('button', { name: 'Confirmar pedido' }).click();

  await expect(page.getByText('¡Pedido confirmado!')).toBeVisible();
  await expect(page.getByText(/Pedido N° \d+/)).toBeVisible();
  await expect(page.getByText('Mesa: 4')).toBeVisible();
  await expect(page.getByText('Estado: pendiente')).toBeVisible();
  await expect(page.getByText(/Total:.*7\.520/)).toBeVisible();

  await page.getByRole('button', { name: 'Actualizar estado' }).click();
  await expect(page.getByText('Estado: pendiente')).toBeVisible();
  await expect(page.getByRole('alert')).toHaveCount(0);
});
