import { Pedido, EstadoPedido } from "./pedido";

type BuscarProducto = Parameters<Pedido["calcularTotal"]>[0];

interface TotalPedido {
    getEstado(): EstadoPedido;
    calcularTotal(buscar: BuscarProducto): number;
}

interface PedidoItems {
    getItems(): ReadonlyArray<{ productoId: number; cantidad: number }>;
}

export class Reporte {
    
}