import type { Request, Response } from "express";
import type { ProductoRepository } from "../repositories/producto.repository";

export class ProductoController {
  constructor(private readonly productos: ProductoRepository) {}

  obtenerTodos = (_req: Request, res: Response): Response => {
    return res.status(200).json(this.productos.obtenerTodos());
  };
}
