import { useCarrito } from "./carritoContext";

function formatPrice(value: number): string {
  return `$${value.toLocaleString("es-AR")}`;
}

export function Carrito({ onConfirm }: { onConfirm: () => void }) {
  const { items, subtotal, dispatch } = useCarrito();
  const isEmpty = items.length === 0;

  return (
    <section aria-labelledby="cart-title" className="card mb-3">
      <div className="card-body">
        <h2 id="cart-title" className="h5">Tu pedido</h2>

        {isEmpty ? (
          <p className="text-muted">Tu carrito está vacío</p>
        ) : (
          <ul className="list-group list-group-flush mb-3">
            {items.map((item) => (
              <li key={item.productoId} className="list-group-item px-0">
                <div className="fw-semibold">{item.nombre}</div>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      aria-label={`Restar ${item.nombre}`}
                      onClick={() => dispatch({ type: "decrement", productoId: item.productoId })}
                    >
                      −
                    </button>
                    <span>{`Cantidad: ${item.cantidad}`}</span>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      aria-label={`Sumar ${item.nombre}`}
                      onClick={() => dispatch({ type: "increment", productoId: item.productoId })}
                    >
                      +
                    </button>
                  </div>
                  <span>{`Subtotal: ${formatPrice(item.precio * item.cantidad)}`}</span>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    aria-label={`Quitar ${item.nombre}`}
                    onClick={() => dispatch({ type: "remove", productoId: item.productoId })}
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="fw-bold">{`Subtotal del pedido: ${formatPrice(subtotal)}`}</p>
        <button type="button" className="btn btn-primary w-100" disabled={isEmpty} onClick={onConfirm}>
          Confirmar pedido
        </button>
      </div>
    </section>
  );
}