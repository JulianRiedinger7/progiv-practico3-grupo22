import { createContext, createElement, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { carritoReducer, carritoSubtotal, type CarritoAction, type CarritoItem } from "./CarritoReducer";

type CartContextValue = {
  items: CarritoItem[];
  subtotal: number;
  dispatch: Dispatch<CarritoAction>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CarritoProvider({
  children,
  initialItems = [],
}: {
  children: ReactNode;
  initialItems?: CarritoItem[];
}) {
  const [state, dispatch] = useReducer(carritoReducer, { items: initialItems });
  const value = useMemo(
    () => ({ items: state.items, subtotal: carritoSubtotal(state.items), dispatch }),
    [state.items],
  );
  return createElement(CartContext.Provider, { value }, children);
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}