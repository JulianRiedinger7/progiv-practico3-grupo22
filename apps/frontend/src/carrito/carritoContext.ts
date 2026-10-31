import { createContext, createElement, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { carritoReducer, carritoSubtotal, type CarritoAction, type CarritoItem } from "./CarritoReducer";

type CarritoContextValue = {
  items: CarritoItem[];
  subtotal: number;
  dispatch: Dispatch<CarritoAction>;
};

const CarritoContext = createContext<CarritoContextValue | null>(null);

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
  return createElement(CarritoContext.Provider, { value }, children);
}

export function useCarrito(): CarritoContextValue {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}