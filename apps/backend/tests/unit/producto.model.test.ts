import { beforeEach, describe, expect, it } from "vitest";
import { CafeEspresso } from "../../src/models/CafeEspresso";
import { CafeFiltrado } from "../../src/models/CafeFiltrado";
import { Pasteleria } from "../../src/models/Pasteleria";

describe("Producto Model", () => {
  let cafeEspresso: CafeEspresso;
  let cafeFiltrado: CafeFiltrado;
  let pasteleria: Pasteleria;

  beforeEach(() => {
    cafeEspresso = new CafeEspresso(1, "pocillo", "etiopia");
    cafeFiltrado = new CafeFiltrado(10, "pocillo", "brasil");
    pasteleria = new Pasteleria(19, "muffin_chocolate");
  });

  it("un café espresso se crea correctamente con sus datos y precio", () => {
    expect(cafeEspresso.getId()).toBe(1);
    expect(cafeEspresso.getNombre()).toBe("Espresso pocillo etiopia");
    expect(cafeEspresso.getTipo()).toBe("espresso");
    expect(cafeEspresso.calcularPrecio()).toBe(6820);
  });

  it("un café filtrado se crea correctamente con sus datos y precio", () => {
    expect(cafeFiltrado.getId()).toBe(10);
    expect(cafeFiltrado.getNombre()).toBe("Filtrado pocillo brasil");
    expect(cafeFiltrado.getTipo()).toBe("filtrado");
    expect(cafeFiltrado.calcularPrecio()).toBe(4040);
  });

  it("un producto de pastelería se crea correctamente con sus datos y precio", () => {
    expect(pasteleria.getId()).toBe(19);
    expect(pasteleria.getNombre()).toBe("Pasteleria muffin chocolate");
    expect(pasteleria.getTipo()).toBe("pasteleria");
    expect(pasteleria.calcularPrecio()).toBe(2500);
  });

  it("serializa correctamente los datos del producto", () => {
    expect(cafeEspresso.toJSON()).toEqual({
      id: 1,
      nombre: "Espresso pocillo etiopia",
      tipo: "espresso",
      precioBase: 2500,
      precioFinal: 6820,
      tamano: "pocillo",
      variedad: "etiopia",
      gramos: 18,
    });
    expect(cafeFiltrado.toJSON()).toMatchObject({
      id: 10,
      tipo: "filtrado",
      precioFinal: 4040,
      gramos: 6,
    });
    expect(pasteleria.toJSON()).toMatchObject({
      id: 19,
      tipo: "pasteleria",
      precioFinal: 2500,
      variedad: "muffin_chocolate",
    });
  });
});