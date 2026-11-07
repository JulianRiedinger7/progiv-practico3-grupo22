export type PedidoCreado = {
  id: number;
  estado: string;
  total: number;
};

export async function crearPedido(datos: {
  mesaId?: number;
  items: { productoId: number; cantidad: number }[];
}): Promise<PedidoCreado> {
  const respuesta = await fetch('/api/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error('No se pudo confirmar el pedido');
  }

  return respuesta.json();
}

export async function obtenerPedido(id: number): Promise<PedidoCreado> {
  const respuesta = await fetch(`/api/pedidos/${id}`);

  if (!respuesta.ok) {
    throw new Error('No se pudo consultar el pedido');
  }

  return respuesta.json();
}