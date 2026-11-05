import { catalogo } from "../config/catalogo";
import type { Producto } from "../models/Producto";

export interface IProductoRepository {
  obtenerTodos(): Producto[];
  obtenerPorId(id: number): Producto | undefined;
}

export class ProductoRepository implements IProductoRepository {
  obtenerTodos(): Producto[] {
    return catalogo;
  }

  obtenerPorId(id: number): Producto | undefined {
    return catalogo.find((producto) => producto.id === id);
  }
}
