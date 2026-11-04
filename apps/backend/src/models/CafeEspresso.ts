export class CafeEspresso {
  constructor(
    public id: number,
    public tamano: string,
    public variedad: string,
  ) {}

  calcularPrecio(): number {
    const gramosPorTamano: Record<string, number> = {
      pocillo: 18,
      mediano: 27,
      taza_grande: 36,
    };
    const precioPorGramo: Record<string, number> = {
      brasil: 140,
      colombia: 180,
      etiopia: 240,
    };

    return gramosPorTamano[this.tamano] * precioPorGramo[this.variedad] + 2500;
  }
}