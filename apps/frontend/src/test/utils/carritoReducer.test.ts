import { describe, expect, it } from "vitest";
import { carritoReducer, type CarritoItem, type CarritoState } from "../../carrito/CarritoReducer";

const expreso: Omit<CarritoItem, "cantidad"> = { productoId: 5, nombre: "Expreso Mediano", precio: 7360 };
const muffin: Omit<CarritoItem, "cantidad"> = { productoId: 19, nombre: "Muffin de chocolate", precio: 2500 };

const empty: CarritoState = { items: [] };

describe("carritoReducer", () => {
  it("agrega un producto nuevo con cantidad 1", () => {
    const state = carritoReducer(empty, { type: "add", item: expreso });
    expect(state.items).toEqual([{ ...expreso, cantidad: 1 }]);
  });

  it("al agregar un producto existente suma 1 a la cantidad", () => {
    const once = carritoReducer(empty, { type: "add", item: expreso });
    const twice = carritoReducer(once, { type: "add", item: expreso });
    expect(twice.items).toEqual([{ ...expreso, cantidad: 2 }]);
  });

  it("increment suma 1 solo al producto indicado", () => {
    let state = carritoReducer(empty, { type: "add", item: expreso });
    state = carritoReducer(state, { type: "add", item: muffin });
    state = carritoReducer(state, { type: "increment", productoId: 19 });
    expect(state.items.map((i: CarritoItem) => i.cantidad)).toEqual([1, 2]);
  });

  it("decrement resta 1", () => {
    let state = carritoReducer(empty, { type: "add", item: expreso });
    state = carritoReducer(state, { type: "increment", productoId: 5 });
    state = carritoReducer(state, { type: "decrement", productoId: 5 });
    expect(state.items[0].cantidad).toBe(1);
  });

  it("decrement con cantidad 1 quita el producto", () => {
    let state = carritoReducer(empty, { type: "add", item: expreso });
    state = carritoReducer(state, { type: "decrement", productoId: 5 });
    expect(state.items).toEqual([]);
  });

  it("remove quita el producto sin importar la cantidad", () => {
    let state = carritoReducer(empty, { type: "add", item: expreso });
    state = carritoReducer(state, { type: "increment", productoId: 5 });
    state = carritoReducer(state, { type: "remove", productoId: 5 });
    expect(state.items).toEqual([]);
  });

  it("clear vacía el carrito", () => {
    let state = carritoReducer(empty, { type: "add", item: expreso });
    state = carritoReducer(state, { type: "clear" });
    expect(state.items).toEqual([]);
  });

  it("ignora acciones sobre productos inexistentes", () => {
    const state = carritoReducer(empty, { type: "increment", productoId: 99 });
    expect(state).toEqual(empty);
  });

  it("no muta el estado anterior", () => {
    const before = carritoReducer(empty, { type: "add", item: expreso });
    const snapshot = structuredClone(before);
    carritoReducer(before, { type: "increment", productoId: 5 });
    expect(before).toEqual(snapshot);
  });
});
