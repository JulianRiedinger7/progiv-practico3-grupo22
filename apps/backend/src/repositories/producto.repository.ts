import { catalogo } from "../config/catalogo";
import type { Producto } from "../models/Producto";

export class ProductoRepository {
  obtenerTodos(): Producto[] {
    return catalogo;
  }

  obtenerPorId(id: number): Producto | undefined {
    return catalogo.find((producto) => producto.id === id);
  }
}
