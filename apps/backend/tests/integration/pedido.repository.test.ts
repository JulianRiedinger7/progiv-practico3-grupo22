import Database from 'better-sqlite3';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createDb } from '../../src/db/connection';
import { Pedido } from '../../src/models/pedido';
import { PedidoRepository } from '../../src/repositories/pedido.repository';

describe('PedidoRepository', () => {
  let db: Database.Database;
  let pedidoRepository: PedidoRepository;

  beforeEach(() => {
    db = createDb(':memory:');
    db.exec(`
      CREATE TABLE productos (
        id INTEGER PRIMARY KEY
      );

      CREATE TABLE pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        estado TEXT NOT NULL DEFAULT 'pendiente'
          CHECK (estado IN ('pendiente', 'entregado', 'cancelado'))
      );

      CREATE TABLE pedido_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
        producto_id INTEGER NOT NULL REFERENCES productos(id),
        cantidad INTEGER NOT NULL
      )
    `);
    pedidoRepository = new PedidoRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  it('devuelve una lista vacía cuando no hay pedidos', () => {
    expect(pedidoRepository.obtenerTodos()).toEqual([]);
  });

  it('obtiene los pedidos guardados con sus items y estado', () => {
    db.exec(`
      INSERT INTO productos (id) VALUES (15);
      INSERT INTO pedidos (id, estado) VALUES (1, 'entregado');
      INSERT INTO pedido_items (pedido_id, producto_id, cantidad)
      VALUES (1, 15, 2);
    `);

    const pedidos = pedidoRepository.obtenerTodos();

    expect(pedidos).toHaveLength(1);
    expect(pedidos[0]).toBeInstanceOf(Pedido);
    expect(pedidos[0].getId()).toBe(1);
    expect(pedidos[0].getEstado()).toBe('entregado');
    expect(pedidos[0].getItems()).toEqual([{ productoId: 15, cantidad: 2 }]);
  });
});
