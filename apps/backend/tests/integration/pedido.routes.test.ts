import { type Express } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../src/app';

describe('Rutas de pedidos', () => {
  let app: Express;

  beforeEach(() => {
    app = createApp(':memory:');
  });

  afterEach(() => {
    app.locals.db.close();
  });

  it('GET /pedidos retorna una lista vacia', async () => {
    const respuesta = await request(app).get('/pedidos');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([]);
  });

  it('GET /pedidos retorna los pedidos existentes', async () => {
    const resultado = app.locals.db.prepare('INSERT INTO pedidos DEFAULT VALUES').run();

    const respuesta = await request(app).get('/pedidos');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([
      {
        id: Number(resultado.lastInsertRowid),
        items: [],
        estado: 'pendiente',
        total: 0,
      },
    ]);
  });

  it('GET /pedidos/:id retorna el pedido existente', async () => {
    const resultado = app.locals.db.prepare('INSERT INTO pedidos DEFAULT VALUES').run();
    const id = Number(resultado.lastInsertRowid);

    const respuesta = await request(app).get(`/pedidos/${id}`);

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
      id,
      items: [],
      estado: 'pendiente',
      total: 0,
    });
  });

  it('GET /pedidos/:id retorna 404 si el pedido no existe', async () => {
    const respuesta = await request(app).get('/pedidos/999');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'Pedido no encontrado' });
  });

  it('POST /pedidos rechaza un pedido sin items con error 400', async () => {
    const respuesta = await request(app).post('/pedidos').send({ items: [] });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'Datos del pedido inválidos',
      detalles: [
        {
          campo: 'items',
          mensaje: 'El pedido debe incluir al menos un ítem',
        },
      ],
    });
  });

  it('POST /pedidos crea un pedido y calcula su total', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({ items: [{ productoId: 1, cantidad: 1 }] });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toEqual({
      id: expect.any(Number),
      items: [{ productoId: 1, cantidad: 1 }],
      estado: 'pendiente',
      total: 5020,
    });
  });

  it('POST /pedidos rechaza un producto inexistente sin guardar el pedido', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({ items: [{ productoId: 999, cantidad: 1 }] });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({ error: 'Producto no encontrado' });

    const resultado = app.locals.db.prepare('SELECT COUNT(*) AS cantidad FROM pedidos').get() as {
      cantidad: number;
    };
    expect(resultado.cantidad).toBe(0);
  });

  it('POST /pedidos acepta mesaId opcional', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({ items: [{ productoId: 1, cantidad: 1 }], mesaId: 5 });
    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toEqual({
      id: expect.any(Number),
      items: [{ productoId: 1, cantidad: 1 }],
      estado: 'pendiente',
      mesaId: 5,
      total: 5020,
    });
  });
});
