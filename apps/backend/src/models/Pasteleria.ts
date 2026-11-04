export class Pasteleria {
  constructor(
    public id: number,
    public variedad: string,
  ) {}

  calcularPrecio(): number {
    const preciosPorVariedad: Record<string, number> = {
      muffin_chocolate: 2500,
      torta_selva_negra: 4200,
    };

    return preciosPorVariedad[this.variedad];
  }
}
