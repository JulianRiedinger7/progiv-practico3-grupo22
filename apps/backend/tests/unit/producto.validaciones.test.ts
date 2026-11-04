import { describe, expect, it } from "vitest";
import { CafeEspresso } from "../../src/models/CafeEspresso";

describe("Validaciones de productos", () => {
  it("rechaza un tamaño de espresso no soportado", () => {
    expect(() => new CafeEspresso(1, "gigante", "brasil").calcularPrecio()).toThrow();
  });

  it("rechaza una variedad de café no soportada", () => {
    expect(() => new CafeEspresso(2, "pocillo", "peru").calcularPrecio()).toThrow();
  });
});
