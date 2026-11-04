import { describe, expect, it } from "vitest";
import { CafeEspresso } from "../../src/models/CafeEspresso";

describe("CafeEspresso", () => {
  it("calcula el precio de un pocillo de Etiopía", () => {
    const cafe = new CafeEspresso(1, "pocillo", "etiopia");

    expect(cafe.calcularPrecio()).toBe(6820);
  });

  it("calcula el precio de un espresso mediano de Brasil", () => {
    const cafe = new CafeEspresso(2, "mediano", "brasil");

    expect(cafe.calcularPrecio()).toBe(6280);
  });
});
