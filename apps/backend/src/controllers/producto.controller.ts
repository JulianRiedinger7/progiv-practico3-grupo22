import type { Request, Response } from "express";
import type { ProductoRepository } from "../repositories/producto.repository";

export class ProductoController {
  constructor(private readonly productos: ProductoRepository) {}

  obtenerTodos = (_req: Request, res: Response): Response => {
    return res.status(200).json(this.productos.obtenerTodos());
  };

  obtenerPorId = (req: Request, res: Response): Response => {
    const producto = this.productos.obtenerPorId(Number(req.params.id));

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
  };
}
