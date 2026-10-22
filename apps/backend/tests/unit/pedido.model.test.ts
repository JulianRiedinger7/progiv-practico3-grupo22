import { describe, expect, it } from 'vitest';
import { Pedido } from '../../src/models/pedido';

describe('Pedido', () => {
  const items = [{ productoId: 10, cantidad: 2 }];

  it('representa un pedido con su id, items y estado', () => {
    const pedido = new Pedido(1, items);

    expect(pedido.getId()).toBe(1);
    expect(pedido.getItems()).toEqual(items);
    expect(pedido.getEstado()).toBe('pendiente');
  });

  it('calcula el total sumando el precio de cada producto por su cantidad', () => {
    const pedido = new Pedido(1, [
      { productoId: 10, cantidad: 2 },
      { productoId: 15, cantidad: 3 },
    ]);
    const precios: Record<number, number> = { 10: 150, 15: 200 };
    const buscarProducto = (productoId: number) => ({
      calcularPrecio: () => precios[productoId],
    });

    expect(pedido.calcularTotal(buscarProducto)).toBe(900);
  });
});
