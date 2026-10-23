import { describe, expect, it, vi } from 'vitest';
import { Pedido } from '../../src/models/pedido';
import { PedidoService } from '../../src/services/pedido.service';

describe('PedidoService', () => {
  const pedido = new Pedido(1, [{ productoId: 10, cantidad: 2 }]);
  const pedidosRepository = {
    obtenerTodos: vi.fn(() => [pedido]),
    obtenerPorId: vi.fn((id: number) => (id === pedido.getId() ? pedido : undefined)),
  };
  const buscarProducto = vi.fn(() => ({ calcularPrecio: () => 150 }));

  it('obtiene todos los pedidos con su total calculado', () => {
    const pedidoService = new PedidoService(pedidosRepository, buscarProducto);

    expect(pedidoService.obtenerTodos()).toEqual([
      {
        id: 1,
        items: [{ productoId: 10, cantidad: 2 }],
        estado: 'pendiente',
        total: 300,
      },
    ]);
    expect(pedidosRepository.obtenerTodos).toHaveBeenCalledOnce();
  });

  it('obtiene un pedido por su id con su total calculado', () => {
    const pedidoService = new PedidoService(pedidosRepository, buscarProducto);

    expect(pedidoService.obtenerPorId(1)).toEqual({
      id: 1,
      items: [{ productoId: 10, cantidad: 2 }],
      estado: 'pendiente',
      total: 300,
    });
    expect(pedidosRepository.obtenerPorId).toHaveBeenCalledWith(1);
  });
});
