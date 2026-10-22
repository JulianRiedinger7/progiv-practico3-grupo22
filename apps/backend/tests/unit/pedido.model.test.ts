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
});
