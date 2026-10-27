import { describe, expect, it } from 'vitest';
import { Reporte } from '../../src/models/reporte';

describe('Reporte', () => {
  const PedidosItems = [{ productoId: 10, cantidad: 2 }, {productoId: 5, cantidad: 1}, {productoId: 2, cantidad: 5},
    {productoId: 10, cantidad: 7}, {productoId: 5, cantidad: 1}];

  it('Da un reporte con la facturación total', () => {
    const reporte = new Reporte() as any;
    reporte.pedidoItems = PedidosItems;
    reporte.items = PedidosItems; 

    const precios: Record<number, number> = { 10: 150, 5: 200, 2: 250 };
    const buscarProducto = (productoId: number) => ({
      calcularPrecio: () => precios[productoId],
    });

    expect(reporte.calcularTotal(buscarProducto)).toBe(3250);
  });


  it('Da un reporte del producto más vendido', () => {
    const reporte = new Reporte() as any; 
    reporte.pedidoItems= PedidosItems;
    reporte.items = PedidosItems; 

    expect(reporte.productoMasVendido()).toBe(10);
  })
});
