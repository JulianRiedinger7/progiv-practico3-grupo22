import { describe, expect, it } from "vitest";
import { Pasteleria } from "../../src/models/Pasteleria";

describe("Pasteleria", () => {
  it("calcula el precio del muffin de chocolate", () => {
    const producto = new Pasteleria(1, "muffin_chocolate");

    expect(producto.calcularPrecio()).toBe(2500);
  });

  it("calcula el precio de la torta selva negra", () => {
    const producto = new Pasteleria(2, "torta_selva_negra");

    expect(producto.calcularPrecio()).toBe(4200);
  });
});
