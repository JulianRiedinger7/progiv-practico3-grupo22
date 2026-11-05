import { Producto } from "./Producto";

export class Pasteleria extends Producto {
  constructor(public id: number, public variedad: string) {
    const preciosPorVariedad: Record<string, number> = {
      muffin_chocolate: 2500,
      torta_selva_negra: 4200,
    };
    const precioBase = preciosPorVariedad[variedad];

    if (precioBase === undefined) {
      throw new Error(`Variedad de pastelería no soportada: ${variedad}`);
    }

    const nombreVariedad = variedad.replaceAll("_", " ");
    super(id, `Pasteleria ${nombreVariedad}`, precioBase);
  }

  calcularPrecio(): number {
    return this.precioBase;
  }
}
