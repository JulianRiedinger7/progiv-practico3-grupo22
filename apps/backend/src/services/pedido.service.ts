import type { BuscarProducto, EstadoPedido, PedidoItem } from '../models/pedido';
import type { IPedidoRepository } from '../repositories/pedido.repository';

export interface PedidoConTotal {
  id: number;
  items: PedidoItem[];
  estado: EstadoPedido;
  total: number;
}

export class PedidoService {
  constructor(
    private readonly pedidos: IPedidoRepository,
    private readonly buscarProducto: BuscarProducto,
  ) {}

  obtenerTodos(): PedidoConTotal[] {
    return this.pedidos.obtenerTodos().map((pedido) => ({
      id: pedido.getId(),
      items: pedido.getItems(),
      estado: pedido.getEstado(),
      total: pedido.calcularTotal(this.buscarProducto),
    }));
  }

  obtenerPorId(id: number): PedidoConTotal | undefined {
    const pedido = this.pedidos.obtenerPorId(id);

    if (!pedido) return undefined;

    return {
      id: pedido.getId(),
      items: pedido.getItems(),
      estado: pedido.getEstado(),
      total: pedido.calcularTotal(this.buscarProducto),
    };
  }
}
