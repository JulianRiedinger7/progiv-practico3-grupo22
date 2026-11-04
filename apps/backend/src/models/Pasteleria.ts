import { Producto } from "./Producto";

export class Pasteleria extends Producto {
  constructor(public id: number, public variedad: string) {
    const preciosPorVariedad: Record<string, number> = {
      muffin_chocolate: 2500,
      torta_selva_negra: 4200,
    };

    const nombreVariedad = variedad.replaceAll("_", " ");
    super(
      id,
      `Pasteleria ${nombreVariedad}`,
      preciosPorVariedad[variedad],
    );
  }

  calcularPrecio(): number {
    return this.precioBase;
  }
}
