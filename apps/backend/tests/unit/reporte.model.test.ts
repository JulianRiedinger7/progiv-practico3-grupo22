import { describe, expect, it } from 'vitest';
import { Reporte } from '../../src/models/reporte';
import { Pedido } from '../../src/models/pedido';

describe('Reporte', () => {
  const pedido1 = { items: [{ productoId: 10, cantidad: 2 }, { productoId: 5, cantidad: 1 }], estado: 'entregado' };
  const pedido2 = { items: [{ productoId: 10, cantidad: 7 }, { productoId: 5, cantidad: 10 }], estado: 'entregado' };
  const pedido3 = { items: [{ productoId: 10, cantidad: 7 }, { productoId: 5, cantidad: 1 }], estado: 'pendiente' };

  const precios: Record<number, number> = { 10: 150, 5: 200, 2: 250 };
  const buscarProducto = (productoId: number) => ({
    calcularPrecio: () => precios[productoId],
  });

  it('factura solo los pedidos entregados', () => {
    const reporte = new Reporte([pedido1, pedido2, pedido3]);

    expect(reporte.calcularFacturacion(buscarProducto)).toBe(3550);
  });

  it('da un reporte del producto más vendido', () => {
    const PedidosItems = [pedido1.items, pedido2.items].flat();
    const reporte = new Reporte([pedido1, pedido2, pedido3]);

    expect(reporte.productoMasVendido()).toBe(5);
  });
});
