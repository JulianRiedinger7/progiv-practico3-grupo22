import type { NuevoPedido, Pedido } from '../models/pedido';

export interface IPedidoRepository {
  obtenerTodos(): Pedido[];
  obtenerPorId(id: number): Pedido | undefined;
  crear(pedido: NuevoPedido): Pedido;
}
