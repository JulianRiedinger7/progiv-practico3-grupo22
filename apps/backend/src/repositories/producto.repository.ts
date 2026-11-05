import { catalogo } from "../config/catalogo";
import type { Producto } from "../models/Producto";

export class ProductoRepository {
  obtenerTodos(): Producto[] {
    return catalogo;
  }
}
