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

  it('devuelve undefined cuando el pedido no existe', () => {
    const pedidoService = new PedidoService(pedidosRepository, buscarProducto);

    expect(pedidoService.obtenerPorId(99)).toBeUndefined();
    expect(pedidosRepository.obtenerPorId).toHaveBeenCalledWith(99);
  });

  it('crea un pedido y lo devuelve con su total calculado', () => {
    const nuevoPedido = { items: [{ productoId: 15, cantidad: 2 }] };
    const pedidoCreado = new Pedido(2, nuevoPedido.items);
    const pedidoRepository = {
      crear: vi.fn(() => pedidoCreado),
      obtenerTodos: vi.fn(() => []),
      obtenerPorId: vi.fn(() => undefined),
    };
    const pedidoService = new PedidoService(pedidoRepository, buscarProducto);

    expect(pedidoService.crear(nuevoPedido)).toEqual({
      id: 2,
      items: [{ productoId: 15, cantidad: 2 }],
      estado: 'pendiente',
      total: 300,
    });
    expect(pedidoRepository.crear).toHaveBeenCalledWith(nuevoPedido);
  });
});
