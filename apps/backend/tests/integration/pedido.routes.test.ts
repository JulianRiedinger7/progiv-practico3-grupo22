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
});
