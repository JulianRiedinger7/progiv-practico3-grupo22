import { Producto } from "./Producto";

export abstract class Cafe extends Producto {
  private readonly precioPorGramo: Record<string, number> = {
    brasil: 140,
    colombia: 180,
    etiopia: 240,
  };

  protected constructor(
    id: number,
    nombre: string,
    precioBase: number,
    public tamano: string,
    public variedad: string,
    private readonly gramosPorTamano: Record<string, number>,
  ) {
    super(id, `${nombre} ${tamano} ${variedad}`, precioBase);
  }

  calcularPrecio(): number {
    const gramos = this.gramosPorTamano[this.tamano];
    const precioPorGramo = this.precioPorGramo[this.variedad];

    if (gramos === undefined) {
      throw new Error(`Tamaño de café no soportado: ${this.tamano}`);
    }

    if (precioPorGramo === undefined) {
      throw new Error(`Variedad de café no soportada: ${this.variedad}`);
    }

    return (
      gramos * precioPorGramo + this.precioBase
    );
  }
}
