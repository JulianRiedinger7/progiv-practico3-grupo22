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
});
