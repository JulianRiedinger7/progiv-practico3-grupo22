import { describe, expect, it } from "vitest";
import { CafeFiltrado } from "../../src/models/CafeFiltrado";

describe("CafeFiltrado", () => {
  it("calcula el precio de un pocillo de Brasil", () => {
    const cafe = new CafeFiltrado(1, "pocillo", "brasil");

    expect(cafe.calcularPrecio()).toBe(4040);
  });
});
