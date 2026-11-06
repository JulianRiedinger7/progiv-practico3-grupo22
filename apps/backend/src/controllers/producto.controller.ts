import type { Request, Response } from "express";
import { Cafe } from "../models/Cafe";
import { CafeEspresso } from "../models/CafeEspresso";
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
    if (producto instanceof Cafe) {
      return {
        id: producto.id,
        nombre: producto.nombre,
        tipo: producto instanceof CafeEspresso ? "expreso" : "filtrado",
        tamanio: producto.tamano,
        gramosCafe: producto.getGramos(),
        variedad: {
          nombre: this.nombreVariedad(producto.variedad),
          descripcion: this.descripcionVariedad(producto.variedad),
        },
        precio: producto.calcularPrecio(),
      };
    }

    const pasteleria = producto as Pasteleria;

    return {
      id: pasteleria.id,
      nombre: pasteleria.nombre,
      tipo: "pasteleria",
      variedad: pasteleria.variedad,
      precio: pasteleria.calcularPrecio(),
    };
  }

  private nombreVariedad(variedad: string): string {
    const nombres: Record<string, string> = {
      brasil: "Brasil",
      colombia: "Colombia",
      etiopia: "Etiopía",
    };

    return nombres[variedad];
  }

  private descripcionVariedad(variedad: string): string {
    const descripciones: Record<string, string> = {
      brasil: "Acidez baja, cuerpo denso y notas de avellana",
      colombia: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
      etiopia: "Acidez muy viva, cuerpo ligero y notas frutales",
    };

    return descripciones[variedad];
  }
}
