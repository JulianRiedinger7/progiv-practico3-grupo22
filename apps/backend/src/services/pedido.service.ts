import type { BuscarProducto, EstadoPedido, NuevoPedido, PedidoItem } from '../models/pedido';
import type { IPedidoRepository } from '../repositories/pedido.repository';

export interface PedidoConTotal {
  id: number;
  items: PedidoItem[];
  estado: EstadoPedido;
  total: number;
}

export interface IPedidoService {
  obtenerTodos(): PedidoConTotal[];
  obtenerPorId(id: number): PedidoConTotal | undefined;
  crear(pedido: NuevoPedido): PedidoConTotal;
}

export class PedidoService implements IPedidoService {
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

  crear(pedido: NuevoPedido): PedidoConTotal {
    const nuevo = this.pedidos.crear(pedido);

    return {
      id: nuevo.getId(),
      items: nuevo.getItems(),
      estado: nuevo.getEstado(),
      total: nuevo.calcularTotal(this.buscarProducto),
    };
  }
}
