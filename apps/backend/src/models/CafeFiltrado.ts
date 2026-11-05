import { Cafe } from "./Cafe";

export class CafeFiltrado extends Cafe {
  constructor(id: number, tamano: string, variedad: string) {
    super(id, "Filtrado", 3200, tamano, variedad, {
      pocillo: 6,
      mediano: 15,
      taza_grande: 25,
    });
  }

  getTipo(): 'filtrado' {
    return 'filtrado';
  }
}
