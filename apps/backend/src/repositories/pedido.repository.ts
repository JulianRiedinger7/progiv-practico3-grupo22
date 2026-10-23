import type { Pedido } from '../models/pedido';

export interface IPedidoRepository {
  obtenerTodos(): Pedido[];
}
