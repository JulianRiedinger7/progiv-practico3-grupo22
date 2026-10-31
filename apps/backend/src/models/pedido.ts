export type EstadoPedido = 'pendiente' | 'entregado' | 'cancelado';

export interface PedidoItem {
  productoId: number;
  cantidad: number;
}

export interface NuevoPedido {
  items: PedidoItem[];
  estado?: EstadoPedido;
}

export interface ProductoConPrecio {
  calcularPrecio(): number;
}

export type BuscarProducto = (id: number) => ProductoConPrecio;

export class Pedido {
  private readonly id: number;
  private readonly items: PedidoItem[];
  private readonly estado: EstadoPedido;

  constructor(
    id: number,
    items: PedidoItem[],
    estado: EstadoPedido = 'pendiente',
  ) {
    this.id = id;
    this.items = items.map((item) => ({ ...item }));
    this.estado = estado;
  }

  getId(): number {
    return this.id;
  }

  getItems(): PedidoItem[] {
    return this.items.map((item) => ({ ...item }));
  }

  getEstado(): EstadoPedido {
    return this.estado;
  }

  calcularTotal(buscarProducto: BuscarProducto): number {
    return this.items.reduce(
      (total, item) =>
        total + buscarProducto(item.productoId).calcularPrecio() * item.cantidad,
      0,
    );
  }
}
