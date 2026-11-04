export class CafeFiltrado {
  constructor(
    public id: number,
    public tamano: string,
    public variedad: string,
  ) {}

  calcularPrecio(): number {
    const gramosPorTamano: Record<string, number> = {
      pocillo: 6,
      mediano: 15,
      taza_grande: 25,
    };
    const precioPorGramo: Record<string, number> = {
      brasil: 140,
      colombia: 180,
      etiopia: 240,
    };

    return gramosPorTamano[this.tamano] * precioPorGramo[this.variedad] + 3200;
  }
}
