export class CafeFiltrado {
  constructor(
    public id: number,
    public tamano: string,
    public variedad: string,
  ) {}

  calcularPrecio(): number {
    return 4040;
  }
}
