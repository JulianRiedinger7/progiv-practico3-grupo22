import { type Express } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../src/app';

describe('Rutas reporte', () => {
  let app: Express;

  beforeEach(() => {
    app = createApp(':memory:');
  });

  afterEach(() => {
    app.locals.db.close();
  });

  

  it('GET /facturacion devuelve la facturación total de los pedidos entregados', async () => {
    const entregado = app.locals.db
      .prepare("INSERT INTO pedidos (estado) VALUES ('entregado')")
      .run();
    const pendiente = app.locals.db
      .prepare("INSERT INTO pedidos (estado) VALUES ('pendiente')")
      .run();

    const insertarItem = app.locals.db.prepare(
      'INSERT INTO pedido_items (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
    );

    insertarItem.run(entregado.lastInsertRowid, 1, 1);
    insertarItem.run(pendiente.lastInsertRowid, 20, 5);

    const respuesta = await request(app).get('/facturacion');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ facturacionTotal: 5020 });
  });

  it('GET /producto_mas_vendido devuelve el producto más vendido de todos los pedidos', async () => {
    const entregado = app.locals.db
      .prepare("INSERT INTO pedidos (estado) VALUES ('entregado')")
      .run();
    const pendiente = app.locals.db
      .prepare("INSERT INTO pedidos (estado) VALUES ('pendiente')")
      .run();

    const insertarItem = app.locals.db.prepare(
      'INSERT INTO pedido_items (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
    );

    insertarItem.run(entregado.lastInsertRowid, 1, 1);
    insertarItem.run(pendiente.lastInsertRowid, 20, 5);
    insertarItem.run(pendiente.lastInsertRowid, 5, 100);

    const respuesta = await request(app).get('/producto_mas_vendido');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ productoMasVendido: 5 });
  });
});
