import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Carrito } from "../../carrito/carrito";
import { CarritoProvider } from "../../carrito/carritoContext";
import type { CarritoItem } from "../../carrito/CarritoReducer";

const items: CarritoItem[] = [
  { productoId: 5, nombre: "Expreso Mediano Colombia", precio: 7360, cantidad: 2 },
  { productoId: 19, nombre: "Muffin de chocolate", precio: 2500, cantidad: 1 },
];

function renderCart(initialItems: CarritoItem[] = [], onConfirm = vi.fn()) {
  render(
    React.createElement(
      CarritoProvider,
      {
        initialItems,
        children: React.createElement(
          Carrito as unknown as React.ComponentType<{ onConfirm: typeof onConfirm }>,
          { onConfirm },
        ),
      },
    ),
  );
  return { onConfirm, user: userEvent.setup() };
}

describe("Cart", () => {
  it("con el carrito vacío muestra un aviso y no deja confirmar", () => {
    renderCart();
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar pedido" })).toBeDisabled();
  });

  it("muestra cada producto con su cantidad y subtotal", () => {
    renderCart(items);
    const [expreso, muffin] = screen.getAllByRole("listitem");
    expect(within(expreso).getByText("Expreso Mediano Colombia")).toBeInTheDocument();
    expect(within(expreso).getByText("Cantidad: 2")).toBeInTheDocument();
    expect(within(expreso).getByText("Subtotal: $14.720")).toBeInTheDocument();
    expect(within(muffin).getByText("Muffin de chocolate")).toBeInTheDocument();
    expect(within(muffin).getByText("Cantidad: 1")).toBeInTheDocument();
    expect(within(muffin).getByText("Subtotal: $2.500")).toBeInTheDocument();
  });

  it("muestra el subtotal general", () => {
    renderCart(items);
    expect(screen.getByText("Subtotal del pedido: $17.220")).toBeInTheDocument();
  });

  it("suma una unidad", async () => {
    const { user } = renderCart(items);
    await user.click(screen.getByRole("button", { name: "Sumar Expreso Mediano Colombia" }));
    expect(screen.getByText("Cantidad: 3")).toBeInTheDocument();
    expect(screen.getByText("Subtotal del pedido: $24.580")).toBeInTheDocument();
  });

  it("resta una unidad", async () => {
    const { user } = renderCart(items);
    await user.click(screen.getByRole("button", { name: "Restar Expreso Mediano Colombia" }));
    const [expreso] = screen.getAllByRole("listitem");
    expect(within(expreso).getByText("Cantidad: 1")).toBeInTheDocument();
    expect(screen.getByText("Subtotal del pedido: $9.860")).toBeInTheDocument();
  });

  it("restar con cantidad 1 quita el producto", async () => {
    const { user } = renderCart(items);
    await user.click(screen.getByRole("button", { name: "Restar Muffin de chocolate" }));
    expect(screen.queryByText("Muffin de chocolate")).not.toBeInTheDocument();
  });

  it("quita un producto", async () => {
    const { user } = renderCart(items);
    await user.click(screen.getByRole("button", { name: "Quitar Expreso Mediano Colombia" }));
    expect(screen.queryByText("Expreso Mediano Colombia")).not.toBeInTheDocument();
    expect(screen.getByText("Subtotal del pedido: $2.500")).toBeInTheDocument();
  });

  it("al quitar el último producto vuelve al estado vacío", async () => {
    const { user } = renderCart([items[1]]);
    await user.click(screen.getByRole("button", { name: "Quitar Muffin de chocolate" }));
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar pedido" })).toBeDisabled();
  });

  it("con productos permite confirmar", async () => {
    const { user, onConfirm } = renderCart(items);
    const button = screen.getByRole("button", { name: "Confirmar pedido" });
    expect(button).toBeEnabled();
    await user.click(button);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});