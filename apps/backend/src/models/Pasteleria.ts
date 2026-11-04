export class Pasteleria {
  constructor(
    public id: number,
    public variedad: string,
  ) {}

  calcularPrecio(): number {
    return 2500;
  }
}
