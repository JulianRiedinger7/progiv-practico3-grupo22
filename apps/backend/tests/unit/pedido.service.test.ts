import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Pedido, type NuevoPedido } from '../../src/models/pedido';
import { IPedidoService, PedidoService } from '../../src/services/pedido.service';
import { IPedidoRepository } from '../../src/repositories/pedido.repository';
import { IProductoRepository } from '../../src/repositories/producto.repository';

describe('PedidoService', () => {
  const pedido = new Pedido(1, [{ productoId: 10, cantidad: 2 }]);
  let pedidosRepository: IPedidoRepository;
  let productosRepository: IProductoRepository;
  let pedidoService: IPedidoService;

  beforeEach(() => {
    pedidosRepository = {
      obtenerTodos: vi.fn(() => [pedido]),
      obtenerPorId: vi.fn((id: number) => (id === pedido.getId() ? pedido : undefined)),
      crear: vi.fn((nuevo: NuevoPedido) => new Pedido(2, nuevo.items, nuevo.estado)),
    };
    productosRepository = {
      obtenerTodos: vi.fn(() => []),
      obtenerPorId: vi.fn((id: number) => ({
        id,
        nombre: `Producto ${id}`,
        precioBase: 150,
        calcularPrecio: () => 150,
      })),
    };
    pedidoService = new PedidoService(pedidosRepository, productosRepository);
  });

  it('obtiene todos los pedidos con su total calculado', () => {
    expect(pedidoService.obtenerTodos()).toEqual([
      {
        id: 1,
        items: [{ productoId: 10, cantidad: 2 }],
        estado: 'pendiente',
        total: 300,
      },
    ]);
    expect(pedidosRepository.obtenerTodos).toHaveBeenCalledOnce();
    expect(productosRepository.obtenerPorId).toHaveBeenCalledWith(10);
  });

  it('obtiene un pedido por su id con su total calculado', () => {
    expect(pedidoService.obtenerPorId(1)).toEqual({
      id: 1,
      items: [{ productoId: 10, cantidad: 2 }],
      estado: 'pendiente',
      total: 300,
    });
    expect(pedidosRepository.obtenerPorId).toHaveBeenCalledWith(1);
    expect(productosRepository.obtenerPorId).toHaveBeenCalledWith(10);
  });

  it('devuelve undefined cuando el pedido no existe', () => {
    expect(pedidoService.obtenerPorId(99)).toBeUndefined();
    expect(pedidosRepository.obtenerPorId).toHaveBeenCalledWith(99);
  });

  it('crea un pedido y lo devuelve con su total calculado', () => {
    const nuevoPedido = { items: [{ productoId: 15, cantidad: 2 }] };

    expect(pedidoService.crear(nuevoPedido)).toEqual({
      id: 2,
      items: [{ productoId: 15, cantidad: 2 }],
      estado: 'pendiente',
      total: 300,
    });
    expect(pedidosRepository.crear).toHaveBeenCalledWith(nuevoPedido);
    expect(productosRepository.obtenerPorId).toHaveBeenCalledWith(15);
  });

  it('no guarda el pedido si falla la búsqueda de un producto', () => {
    const nuevoPedido = { items: [{ productoId: 99, cantidad: 1 }] };
    vi.mocked(productosRepository.obtenerPorId).mockReturnValue(undefined);

    expect(() => pedidoService.crear(nuevoPedido)).toThrow('Producto 99 no encontrado');
    expect(pedidosRepository.crear).not.toHaveBeenCalled();
  });
});
