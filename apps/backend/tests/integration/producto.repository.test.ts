import { describe, expect, it } from "vitest";
import { ProductoRepository } from "../../src/repositories/producto.repository";

describe("ProductoRepository", () => {
  it("devuelve los productos del catálogo", () => {
    const repository = new ProductoRepository();

    expect(
      repository
        .obtenerTodos()
        .some((producto) => producto.nombre === "Espresso pocillo brasil"),
    ).toBe(true);
  });

  it("incluye todas las combinaciones de café y los productos de pastelería", () => {
    const repository = new ProductoRepository();

    expect(repository.obtenerTodos()).toHaveLength(20);
  });

  it("obtiene un producto por id", () => {
    const repository = new ProductoRepository();

    expect(repository.obtenerPorId(1)?.nombre).toBe("Espresso pocillo brasil");
  });
});
