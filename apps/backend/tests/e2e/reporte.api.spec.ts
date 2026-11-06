import { expect, test } from '@playwright/test';

test.describe('API de reporte', () => {
  test('GET /reporte/facturacion devuelve un número', async ({ request }) => {
    const respuesta = await request.get('/reporte/facturacion');

    expect(respuesta.status()).toBe(200);
    const body = await respuesta.json(); 
    expect(typeof body.facturacionTotal).toBe('number');
  });

  test('GET /reporte/producto_mas_vendido devuelve un producto', async ({ request }) => {
    const respuesta = await request.get('/reporte/producto_mas_vendido');

    expect(respuesta.status()).toBe(200);
    const body = await respuesta.json();
    expect(typeof body.productoMasVendido).toBe('number');
  });
});
