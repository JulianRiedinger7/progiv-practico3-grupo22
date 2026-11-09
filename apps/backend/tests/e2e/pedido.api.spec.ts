import { expect, test } from '@playwright/test';

test.describe('API de pedidos', () => {
  test('GET /pedidos devuelve una lista', async ({ request }) => {
    const respuesta = await request.get('/pedidos');

    expect(respuesta.status()).toBe(200);
    expect(Array.isArray(await respuesta.json())).toBe(true);
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

  test('POST crea un pedido que puede consultarse por ID', async ({ request }) => {
    const respuestaCrear = await request.post('/pedidos', {
      data: { items: [{ productoId: 1, cantidad: 2 }] },
    });

    expect(respuestaCrear.status()).toBe(201);
    const pedidoCreado = await respuestaCrear.json();
    expect(pedidoCreado).toMatchObject({
      id: expect.any(Number),
      items: [{ productoId: 1, cantidad: 2 }],
      estado: 'pendiente',
      total: 10040,
    });

    const respuestaConsultar = await request.get(`/pedidos/${pedidoCreado.id}`);

    expect(respuestaConsultar.status()).toBe(200);
    expect(await respuestaConsultar.json()).toEqual(pedidoCreado);
  });
});
