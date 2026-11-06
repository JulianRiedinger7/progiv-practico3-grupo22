import type {
  EstadoPedido,
  NuevoPedido,
  PedidoItem,
  ProductoConPrecio,
} from '../models/pedido';
import type { IPedidoRepository } from '../repositories/pedido.repository';
import type { IProductoRepository } from '../repositories/producto.repository';

export class ProductoNoEncontradoError extends Error {
  constructor(id: number) {
    super(`Producto ${id} no encontrado`);
    this.name = 'ProductoNoEncontradoError';
  }
}

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
    private readonly productos: IProductoRepository,
  ) {}

  obtenerTodos(): PedidoConTotal[] {
    return this.pedidos.obtenerTodos().map((pedido) => ({
      id: pedido.getId(),
      items: pedido.getItems(),
      estado: pedido.getEstado(),
      total: pedido.calcularTotal((id) => this.obtenerProducto(id)),
    }));
  }

  obtenerPorId(id: number): PedidoConTotal | undefined {
    const pedido = this.pedidos.obtenerPorId(id);

    if (!pedido) return undefined;

    return {
      id: pedido.getId(),
      items: pedido.getItems(),
      estado: pedido.getEstado(),
      total: pedido.calcularTotal((id) => this.obtenerProducto(id)),
    };
  }

  crear(pedido: NuevoPedido): PedidoConTotal {
    const productos = new Map<number, ProductoConPrecio>();

    pedido.items.forEach((item) => {
      if (!productos.has(item.productoId)) {
        productos.set(item.productoId, this.obtenerProducto(item.productoId));
      }
    });

    const nuevo = this.pedidos.crear(pedido);

    return {
      id: nuevo.getId(),
      items: nuevo.getItems(),
      estado: nuevo.getEstado(),
      total: nuevo.calcularTotal((id) => productos.get(id)!),
    };
  }

  private obtenerProducto(id: number): ProductoConPrecio {
    const producto = this.productos.obtenerPorId(id);

    if (!producto) {
      throw new ProductoNoEncontradoError(id);
    }

    return producto;
  }
}
