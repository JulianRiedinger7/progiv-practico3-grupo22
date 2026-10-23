import type Database from 'better-sqlite3';
import { Pedido, type EstadoPedido, type NuevoPedido, type PedidoItem } from '../models/pedido';

export interface IPedidoRepository {
  obtenerTodos(): Pedido[];
  obtenerPorId(id: number): Pedido | undefined;
  crear(pedido: NuevoPedido): Pedido;
}

interface PedidoRow {
  id: number;
  estado: EstadoPedido;
}

interface PedidoItemRow {
  producto_id: number;
  cantidad: number;
}

export class PedidoRepository {
  constructor(private readonly db: Database.Database) {}

  obtenerTodos(): Pedido[] {
    const pedidos = this.db.prepare('SELECT id, estado FROM pedidos').all() as PedidoRow[];

    return pedidos.map((pedido) => {
      const items = this.db
        .prepare('SELECT producto_id, cantidad FROM pedido_items WHERE pedido_id = ?')
        .all(pedido.id) as PedidoItemRow[];

      const itemsPedido: PedidoItem[] = items.map((item) => ({
        productoId: item.producto_id,
        cantidad: item.cantidad,
      }));

      return new Pedido(pedido.id, itemsPedido, pedido.estado);
    });
  }

  obtenerPorId(id: number): Pedido | undefined {
    const pedido = this.db.prepare('SELECT id, estado FROM pedidos WHERE id = ?').get(id) as
      | PedidoRow
      | undefined;

    if (!pedido) return undefined;

    const items = this.db
      .prepare('SELECT producto_id, cantidad FROM pedido_items WHERE pedido_id = ?')
      .all(pedido.id) as PedidoItemRow[];

    const itemsPedido: PedidoItem[] = items.map((item) => ({
      productoId: item.producto_id,
      cantidad: item.cantidad,
    }));

    return new Pedido(pedido.id, itemsPedido, pedido.estado);
  }
}
