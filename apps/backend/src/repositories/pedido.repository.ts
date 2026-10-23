import type Database from 'better-sqlite3';
import type { NuevoPedido, Pedido } from '../models/pedido';

export interface IPedidoRepository {
  obtenerTodos(): Pedido[];
  obtenerPorId(id: number): Pedido | undefined;
  crear(pedido: NuevoPedido): Pedido;
}

export class PedidoRepository {
  constructor(private readonly db: Database.Database) {}

  obtenerTodos(): Pedido[] {
    return [];
  }
}
