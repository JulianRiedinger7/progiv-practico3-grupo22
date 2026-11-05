export type TipoProducto = 'espresso' | 'filtrado' | 'pasteleria';

export abstract class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public precioBase: number,
  ) {}

  abstract getTipo(): TipoProducto;

  abstract calcularPrecio(): number;

  getId(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      tipo: this.getTipo(),
      precioBase: this.precioBase,
      precioFinal: this.calcularPrecio(),
    };
  }
}
