export type EstadoPedido = 'pendiente' | 'entregado' | 'cancelado';

export interface PedidoItem {
  productoId: number;
  cantidad: number;
}

export class Pedido {
  constructor(
    public readonly id: number,
    public readonly items: PedidoItem[],
    public estado: EstadoPedido = 'pendiente',
  ) {}
}
