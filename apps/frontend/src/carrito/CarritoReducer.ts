export type CarritoItem = {
  productoId: number;
  nombre: string;
  precio: number; // precio unitario que vino de la API (solo orientativo)
  cantidad: number;
};

export type CarritoState = { items: CarritoItem[] };

export type CarritoAction =
  | { type: "add"; item: Omit<CarritoItem, "cantidad"> }
  | { type: "increment"; productoId: number }
  | { type: "decrement"; productoId: number }
  | { type: "remove"; productoId: number }
  | { type: "clear" };

export const initialCartState: CarritoState = { items: [] };

export function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
 
}