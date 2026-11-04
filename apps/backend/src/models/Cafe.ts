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
    return (
      this.gramosPorTamano[this.tamano] * this.precioPorGramo[this.variedad] +
      this.precioBase
    );
  }
}
