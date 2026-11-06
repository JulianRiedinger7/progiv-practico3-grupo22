import type { Request, Response } from "express";
import { Cafe } from "../models/Cafe";
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
      .json(this.productos.obtenerTodos().map((producto) => producto));
  };

  obtenerPorId = (req: Request, res: Response): Response => {
    const producto = this.productos.obtenerPorId(Number(req.params.id));

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
  };

  // private serializar(producto: Producto) {
  //   let tipo: string;
  //   let gramosCafe: number | undefined;

  //   if (producto instanceof CafeEspresso) {
  //     tipo = "expreso";
  //     gramosCafe = { pocillo: 18, mediano: 27, taza_grande: 36 }[producto.tamano];
  //   } else if (producto instanceof CafeFiltrado) {
  //     tipo = "filtrado";
  //     gramosCafe = { pocillo: 6, mediano: 15, taza_grande: 25 }[producto.tamano];
  //   } else {
  //     tipo = "pasteleria";
  //   }

  //   return {
  //     ...producto,
  //     tipo,
  //     precio: producto.calcularPrecio(),
  //     ...(producto instanceof Cafe
  //       ? {
  //           gramosCafe,
  //           variedad: {
  //             nombre: this.nombreVariedad(producto.variedad),
  //             descripcion: this.descripcionVariedad(producto.variedad),
  //           },
  //         }
  //       : {}),
  //   };
  // }

  // private nombreVariedad(variedad: string): string {
  //   const nombres: Record<string, string> = {
  //     brasil: "Brasil",
  //     colombia: "Colombia",
  //     etiopia: "Etiopía",
  //   };

  //   return nombres[variedad];
  // }

  // private descripcionVariedad(variedad: string): string {
  //   const descripciones: Record<string, string> = {
  //     brasil: "Acidez baja, cuerpo denso y notas de avellana",
  //     colombia: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
  //     etiopia: "Acidez muy viva, cuerpo ligero y notas frutales",
  //   };

  //   return descripciones[variedad];
  // }
}
