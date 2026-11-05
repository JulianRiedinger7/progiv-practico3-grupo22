import { expect, test } from '@playwright/test';

test.describe('API de reporte', () => {
  test('GET /facturacion devuelve un número', async ({ request }) => {
    const respuesta = await request.get('/facturacion');

    expect(respuesta.status()).toBe(200);
    const body = await respuesta.json(); 
    expect(typeof body.facturacionTotal).toBe('number');
  });

  test('GET /producto_mas_vendido devuelve un producto', async ({ request }) => {
    const respuesta = await request.get('/producto_mas_vendido');

    expect(respuesta.status()).toBe(200);
    const body = await respuesta.json();
    expect(typeof body.productoMasVendido).toBe('number');
  });
});
