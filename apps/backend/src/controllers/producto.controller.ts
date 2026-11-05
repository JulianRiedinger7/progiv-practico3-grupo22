import type { Request, Response } from "express";
import { CafeEspresso } from "../models/CafeEspresso";
import { CafeFiltrado } from "../models/CafeFiltrado";
import { Pasteleria } from "../models/Pasteleria";
import type { Producto } from "../models/Producto";
import type { ProductoRepository } from "../repositories/producto.repository";

export class ProductoController {
  constructor(private readonly productos: ProductoRepository) {}

  obtenerTodos = (_req: Request, res: Response): Response => {
    return res
      .status(200)
      .json(this.productos.obtenerTodos().map((producto) => this.serializar(producto)));
  };

  obtenerPorId = (req: Request, res: Response): Response => {
    const producto = this.productos.obtenerPorId(Number(req.params.id));

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(this.serializar(producto));
  };

  private serializar(producto: Producto) {
    let tipo: string;

    if (producto instanceof CafeEspresso) {
      tipo = "expreso";
    } else if (producto instanceof CafeFiltrado) {
      tipo = "filtrado";
    } else {
      tipo = "pasteleria";
    }

    return {
      ...producto,
      tipo,
      precio: producto.calcularPrecio(),
    };
  }
}
