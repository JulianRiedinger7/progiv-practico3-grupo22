import { type Express } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../src/app';
import { catalogo } from '../../src/config/catalogo';

describe('Rutas de productos', () => {
  let app: Express;

  beforeEach(() => {
    app = createApp(':memory:');
  });

  afterEach(() => {
    app.locals.db.close();
  });

  it('GET /productos retorna el catálogo', async () => {
    const respuesta = await request(app).get('/productos');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(20);
    expect(respuesta.body[0]).toEqual({
      id: 1,
      nombre: 'Espresso pocillo brasil',
      tipo: 'espresso',
      precioBase: 2500,
      precioFinal: 5020,
      tamano: 'pocillo',
      variedad: 'brasil',
      gramos: 18,
    });
  });

  it('registra en SQLite los IDs del catálogo al iniciar la app', () => {
    const productos = app.locals.db.prepare('SELECT id FROM productos ORDER BY id').all() as {
      id: number;
    }[];

    const idsDelCatalogo = catalogo.map((producto) => producto.id).sort((a, b) => a - b);

    expect(productos.map((producto) => producto.id)).toEqual(idsDelCatalogo);
  });

  it('GET /productos/:id retorna el producto existente', async () => {
    const respuesta = await request(app).get('/productos/1');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
      id: 1,
      nombre: 'Espresso pocillo brasil',
      tipo: 'espresso',
      precioBase: 2500,
      precioFinal: 5020,
      tamano: 'pocillo',
      variedad: 'brasil',
      gramos: 18,
    });
  });

  it('GET /productos/:id retorna 404 si el producto no existe', async () => {
    const respuesta = await request(app).get('/productos/999');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'Producto no encontrado' });
  });
});
