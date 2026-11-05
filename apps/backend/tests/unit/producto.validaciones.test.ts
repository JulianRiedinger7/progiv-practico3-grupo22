import { describe, expect, it } from "vitest";
import { CafeEspresso } from "../../src/models/CafeEspresso";
import { Pasteleria } from "../../src/models/Pasteleria";

describe("Validaciones de productos", () => {
  it("rechaza un tamaño de espresso no soportado", () => {
    expect(() => new CafeEspresso(1, "gigante", "brasil").calcularPrecio()).toThrow();
  });

  it("rechaza una variedad de café no soportada", () => {
    expect(() => new CafeEspresso(2, "pocillo", "peru").calcularPrecio()).toThrow();
  });

  it("rechaza una variedad de pastelería no soportada", () => {
    expect(() => new Pasteleria(3, "brownie").calcularPrecio()).toThrow();
  });
});
