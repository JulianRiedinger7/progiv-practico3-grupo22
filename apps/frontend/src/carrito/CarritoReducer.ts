export type CarritoItem = {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

export type CarritoState = { items: CarritoItem[] };

export type CarritoAction =
  | { type: "add"; item: Omit<CarritoItem, "cantidad"> }
  | { type: "increment"; productoId: number }
  | { type: "decrement"; productoId: number }
  | { type: "remove"; productoId: number }
  | { type: "clear" };

export const initialCarritoState: CarritoState = { items: [] };

export function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case "add": {
      const exists = state.items.some((i) => i.productoId === action.item.productoId);
      return {
        items: exists
          ? state.items.map((i) =>
              i.productoId === action.item.productoId ? { ...i, cantidad: i.cantidad + 1 } : i,
            )
          : [...state.items, { ...action.item, cantidad: 1 }],
      };
    }
    case "increment":
      return {
        items: state.items.map((i) =>
          i.productoId === action.productoId ? { ...i, cantidad: i.cantidad + 1 } : i,
        ),
      };
    case "decrement":
      return {
        items: state.items
          .map((i) => (i.productoId === action.productoId ? { ...i, cantidad: i.cantidad - 1 } : i))
          .filter((i) => i.cantidad > 0),
      };
    case "remove":
      return { items: state.items.filter((i) => i.productoId !== action.productoId) };
    case "clear":
      return initialCarritoState;
  }
}

export function carritoSubtotal(items: CarritoItem[]): number {
  return items.reduce((total, i) => total + i.precio * i.cantidad, 0);
}