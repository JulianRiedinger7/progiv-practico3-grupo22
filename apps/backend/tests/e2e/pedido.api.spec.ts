import { expect, test } from '@playwright/test';

test.describe('API de pedidos', () => {
  test('GET /pedidos devuelve una lista vacía', async ({ request }) => {
    const respuesta = await request.get('/pedidos');

    expect(respuesta.status()).toBe(200);
    expect(await respuesta.json()).toEqual([]);
  });

  test('GET /pedidos/:id devuelve 404 si no existe', async ({ request }) => {
    const respuesta = await request.get('/pedidos/999');

    expect(respuesta.status()).toBe(404);
    expect(await respuesta.json()).toEqual({ error: 'Pedido no encontrado' });
  });

  test('POST /pedidos rechaza pedidos sin ítems', async ({ request }) => {
    const respuesta = await request.post('/pedidos', {
      data: { items: [] },
    });

    expect(respuesta.status()).toBe(400);
    expect(await respuesta.json()).toEqual({
      error: 'Datos del pedido inválidos',
      detalles: [
        {
          campo: 'items',
          mensaje: 'El pedido debe incluir al menos un ítem',
        },
      ],
    });
  });
});
