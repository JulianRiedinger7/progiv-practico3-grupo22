export interface ItemReporte {
  productoId: number;
  cantidad: number;
}

export interface ProductoConPrecio {
  calcularPrecio(): number;
}

export type BuscarProducto = (productoId: number) => ProductoConPrecio;

export class Reporte {
  items: ItemReporte[] = [];

  calcularFacturacion(buscarProducto: BuscarProducto): number {
    return this.items.reduce(
      (total, item) =>
        total + buscarProducto(item.productoId).calcularPrecio() * item.cantidad,
      0,
    );
  }

  productoMasVendido(): number | undefined {
    const ventas = new Map<number, number>();

    for (const item of this.items) {
      ventas.set(
        item.productoId,
        (ventas.get(item.productoId) ?? 0) + item.cantidad,
      );
    }

    let masVendido: number | undefined;
    let maxCantidad = 0;
    for (const [productoId, cantidad] of ventas) {
      if (cantidad > maxCantidad) {
        maxCantidad = cantidad;
        masVendido = productoId;
      }
    }

    return masVendido;
  }
}