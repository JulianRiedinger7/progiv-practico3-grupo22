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
  mesa_id: number | null;
}

interface PedidoItemRow {
  producto_id: number;
  cantidad: number;
}

export class PedidoRepository implements IPedidoRepository {
  constructor(private readonly db: Database.Database) {}

  obtenerTodos(): Pedido[] {
    const pedidos = this.db.prepare('SELECT id, estado, mesa_id FROM pedidos').all() as PedidoRow[];

    return pedidos.map((pedido) => this.mapearPedido(pedido));
  }

  obtenerPorId(id: number): Pedido | undefined {
    const pedido = this.db
      .prepare('SELECT id, estado, mesa_id FROM pedidos WHERE id = ?')
      .get(id) as PedidoRow | undefined;

    if (!pedido) return undefined;

    return this.mapearPedido(pedido);
  }

  crear(pedido: NuevoPedido): Pedido {
    const resultado = this.db
      .prepare('INSERT INTO pedidos (estado, mesa_id) VALUES (?, ?)')
      .run(pedido.estado ?? 'pendiente', pedido.mesaId ?? null);

    const id = Number(resultado.lastInsertRowid);
    const insertarItem = this.db.prepare(
      'INSERT INTO pedido_items (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
    );

    pedido.items.forEach((item) => {
      insertarItem.run(id, item.productoId, item.cantidad);
    });

    return new Pedido(id, pedido.items, pedido.estado, pedido.mesaId);
  }

  private mapearPedido(pedido: PedidoRow): Pedido {
    const items = this.db
      .prepare('SELECT producto_id, cantidad FROM pedido_items WHERE pedido_id = ?')
      .all(pedido.id) as PedidoItemRow[];

    const itemsPedido: PedidoItem[] = items.map((item) => ({
      productoId: item.producto_id,
      cantidad: item.cantidad,
    }));

    return new Pedido(pedido.id, itemsPedido, pedido.estado, pedido.mesa_id ?? undefined);
  }
}
