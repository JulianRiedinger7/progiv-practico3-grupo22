import { describe, expect, it } from "vitest";
import { CafeFiltrado } from "../../src/models/CafeFiltrado";

describe("CafeFiltrado", () => {
  it("calcula el precio de un pocillo de Brasil", () => {
    const cafe = new CafeFiltrado(1, "pocillo", "brasil");

    expect(cafe.calcularPrecio()).toBe(4040);
  });

  it("calcula el precio de un filtrado taza grande de Colombia", () => {
    const cafe = new CafeFiltrado(2, "taza_grande", "colombia");

    expect(cafe.calcularPrecio()).toBe(7700);
  });

  it("calcula el precio de un filtrado mediano de Etiopía", () => {
    const cafe = new CafeFiltrado(3, "mediano", "etiopia");

    expect(cafe.calcularPrecio()).toBe(6800);
  });
});
