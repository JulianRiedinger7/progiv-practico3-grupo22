import { beforeEach, describe, expect, it, vi } from 'vitest';
import {ReporteService} from '../../src/services/reporte.service';
import { Pedido } from '../../src/models/pedido';
import type { Producto } from '../../src/models/Producto';
import type { IPedidoRepository } from '../../src/repositories/pedido.repository';
import type { IProductoRepository } from '../../src/repositories/producto.repository';

describe('ReporteService', () => {
  const pedido1 = new Pedido(1, [{ productoId: 10, cantidad: 2 }], 'entregado');
  const pedido2 = new Pedido(
    2,
    [
      { productoId: 5, cantidad: 3 },
      { productoId: 2, cantidad: 2 },
    ],
    'entregado',
  );
  const pedido3 = new Pedido(3, [{ productoId: 2, cantidad: 1 }], 'pendiente');

  const precios: Record<number, number> = { 10: 150, 5: 200, 2: 250 };

  let pedidosRepository: IPedidoRepository;
  let productosRepository: IProductoRepository;
  let reporteService: ReporteService;

  beforeEach(() => {
    pedidosRepository = {
      obtenerTodos: vi.fn(() => [pedido1, pedido2, pedido3]),
      obtenerPorId: vi.fn((id: number) =>
        [pedido1, pedido2, pedido3].find((pedido) => pedido.getId() === id),
      ),
      crear: vi.fn(),
    };

    productosRepository = {
      obtenerTodos: vi.fn(() => []),
      obtenerPorId: vi.fn((id: number) => ({
        id,
        nombre: `Producto ${id}`,
        precioBase: precios[id] ?? 0,
        calcularPrecio: () => precios[id] ?? 0,
      } as unknown as Producto)),
    };

    reporteService = new ReporteService();
  });

  it('calcula la facturación total de los pedidos entregados', () => {
    expect(reporteService.generarReporte().facturacionTotal).toBe(1400);

    expect(pedidosRepository.obtenerTodos).toHaveBeenCalledOnce();
    expect(productosRepository.obtenerPorId).toHaveBeenCalledWith(10);
    expect(productosRepository.obtenerPorId).toHaveBeenCalledWith(5);
    expect(productosRepository.obtenerPorId).toHaveBeenCalledWith(2);
  });

  it('devuelve el producto más vendido entre los pedidos entregados', () => {
    expect(reporteService.generarReporte().productoMasVendido).toBe(5);
  });
});

