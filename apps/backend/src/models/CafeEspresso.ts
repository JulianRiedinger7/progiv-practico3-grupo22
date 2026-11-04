import { Cafe } from "./Cafe";

export class CafeEspresso extends Cafe {
  constructor(id: number, tamano: string, variedad: string) {
    super(id, "Espresso", 2500, tamano, variedad, {
      pocillo: 18,
      mediano: 27,
      taza_grande: 36,
    });
  }
}