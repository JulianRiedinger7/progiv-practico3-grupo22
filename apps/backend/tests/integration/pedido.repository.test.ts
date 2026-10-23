import Database from 'better-sqlite3';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createDb } from '../../src/db/connection';
import { initializeSchema } from '../../src/db/schema';
import { Pedido, type NuevoPedido } from '../../src/models/pedido';
import { PedidoRepository } from '../../src/repositories/pedido.repository';

describe('PedidoRepository', () => {
  let db: Database.Database;
  let pedidoRepository: PedidoRepository;

  beforeEach(() => {
    db = createDb(':memory:');
    initializeSchema(db);
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

  it('devuelve undefined cuando no existe un pedido con ese id', () => {
    expect(pedidoRepository.obtenerPorId(99)).toBeUndefined();
  });

  it('devuelve el pedido guardado por id', () => {
    db.exec(`
      INSERT INTO productos (id) VALUES (15);
      INSERT INTO pedidos (id, estado) VALUES (1, 'entregado');
      INSERT INTO pedido_items (pedido_id, producto_id, cantidad)
      VALUES (1, 15, 2);
    `);

    const pedido = pedidoRepository.obtenerPorId(1);

    expect(pedido).toBeDefined();
    expect(pedido).toBeInstanceOf(Pedido);
    expect(pedido?.getId()).toBe(1);
    expect(pedido?.getEstado()).toBe('entregado');
    expect(pedido?.getItems()).toEqual([{ productoId: 15, cantidad: 2 }]);
  });

  it('crea el pedido y persiste sus items con estado pendiente por defecto', () => {
    db.exec('INSERT INTO productos (id) VALUES (15)');
    const nuevoPedido: NuevoPedido = {
      items: [{ productoId: 15, cantidad: 2 }],
    };

    const pedido = pedidoRepository.crear(nuevoPedido);

    expect(pedido).toBeInstanceOf(Pedido);
    expect(pedido.getId()).toBe(1);
    expect(pedido.getEstado()).toBe('pendiente');
    expect(pedido.getItems()).toEqual([{ productoId: 15, cantidad: 2 }]);
    expect(db.prepare('SELECT id, estado FROM pedidos').get()).toEqual({
      id: 1,
      estado: 'pendiente',
    });
    expect(
      db.prepare('SELECT id, pedido_id, producto_id, cantidad FROM pedido_items').all(),
    ).toEqual([{ id: 1, pedido_id: 1, producto_id: 15, cantidad: 2 }]);
  });
});
