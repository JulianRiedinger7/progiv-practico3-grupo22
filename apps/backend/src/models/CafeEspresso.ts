export class CafeEspresso {
  constructor(
    public id: number,
    public tamano: string,
    public variedad: string,
  ) {}

  calcularPrecio(): number {
    return 6820;
  }
}