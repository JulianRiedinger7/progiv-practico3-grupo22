import type { IPedidoRepository } from '../repositories/pedido.repository';
import type { IProductoRepository } from '../repositories/producto.repository';
import { Reporte, type ProductoConPrecio } from '../models/reporte';
import { ProductoNoEncontradoError } from './pedido.service';

export interface ReporteJSON {
  facturacionTotal: number;
  productoMasVendido: number | undefined;
}

export interface IReporteService {
  generarReporte(): ReporteJSON;
}

export class ReporteService implements IReporteService {
  constructor(
    private readonly pedidos: IPedidoRepository,
    private readonly productos: IProductoRepository,
  ) {}

  generarReporte(): ReporteJSON {
    const reporte = new Reporte(
      this.pedidos.obtenerTodos().map((pedido) => ({
        estado: pedido.getEstado(),
        items: pedido.getItems(),
      })),
    );

    return {
      facturacionTotal: reporte.calcularFacturacion((id) => this.obtenerProducto(id)),
      productoMasVendido: reporte.productoMasVendido(),
    };
  }

  private obtenerProducto(id: number): ProductoConPrecio {
    const producto = this.productos.obtenerPorId(id);

    if (!producto) {
      throw new ProductoNoEncontradoError(id);
    }

    return producto;
  }
}
