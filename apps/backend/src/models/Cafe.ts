import { Producto } from "./Producto";

const informacionVariedades: Record<
  string,
  { nombre: string; descripcion: string }
> = {
  brasil: {
    nombre: "Brasil",
    descripcion: "Acidez baja, cuerpo denso y notas de avellana",
  },
  colombia: {
    nombre: "Colombia",
    descripcion: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
  },
  etiopia: {
    nombre: "Etiopía",
    descripcion: "Acidez muy viva, cuerpo ligero y notas frutales",
  },
};

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

  getGramos(): number {
    return this.gramosPorTamano[this.tamano];
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

  toJSON() {
    const informacionVariedad = informacionVariedades[this.variedad];
    const tipo = this.getTipo();

    if (!informacionVariedad) {
      throw new Error(`Variedad de café no soportada: ${this.variedad}`);
    }

    return {
      id: this.id,
      nombre: this.nombre,
      tipo: tipo === "espresso" ? "expreso" : tipo,
      tamanio: this.tamano,
      gramosCafe: this.getGramos(),
      variedad: informacionVariedad,
      precio: this.calcularPrecio(),
    };
  }
}
