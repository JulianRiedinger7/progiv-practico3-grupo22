import { useCallback, useEffect, useState } from 'react';
import MenuHeader from './MenuHeader';
import CafeSelector from './CafeSelector';
import { listarProductos } from '../services/productosService';
import type { Producto } from '../schemas/producto';
import { leerMesaDesdeUrl } from '../utils/mesa';
import { Carrito } from '../carrito/carrito';
import { CarritoProvider, useCarrito } from '../carrito/carritoContext';
import { crearPedido, obtenerPedido, type PedidoCreado } from '../services/pedidoService';
import { formatearPrecio } from '../utils/precio';

function MenuPageContent() {
  const mesa = leerMesaDesdeUrl(window.location.search);
  const [pedido, setPedido] = useState<PedidoCreado | null>(null);
  const [errorPedido, setErrorPedido] = useState<string | null>(null);
  const { dispatch, items } = useCarrito();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const productosPasteleria = productos.filter((producto) => producto.tipo === 'pasteleria');

  const agregarAlPedido = useCallback(
    (producto: Producto) => {
      setConfirmado(false);
      dispatch({
        type: 'add',
        item: {
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
        },
      });
    },
    [dispatch],
  );

  const confirmarPedido = useCallback(async () => {
    setErrorPedido(null);
    try {
      const creado = await crearPedido({
        ...(mesa !== null ? { mesaId: mesa } : {}),
        items: items.map(({ productoId, cantidad }) => ({ productoId, cantidad })),
      });

      dispatch({ type: 'clear' });
      setPedido(creado);
    } catch (error: unknown) {
      setErrorPedido(error instanceof Error ? error.message : 'No se pudo confirmar el pedido');
    }
  }, [dispatch, items, mesa]);

  const actualizarEstado = useCallback(async () => {
    if (!pedido) return;

    const actualizado = await obtenerPedido(pedido.id);
    setPedido(actualizado);
  }, [pedido]);

  const cargarProductos = useCallback(() => {
    setLoading(true);
    setError(false);

    listarProductos()
      .then(setProductos)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  return (
    <main className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-9'>
          <MenuHeader mesa={mesa} />

          <section aria-labelledby='menu-page-title'>
            <h2 id='menu-page-title' className='h3 text-primary border-bottom pb-3 mb-4'>
              Productos
            </h2>

            {!pedido && (
              <>
                <CafeSelector productos={productos} onAgregar={agregarAlPedido} />

                {loading && (
                  <p className='alert alert-info' role='status'>
                    Cargando productos...
                  </p>
                )}
                {!loading && error && (
                  <div className='alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3'>
                    <p role='alert' className='mb-0'>
                      No se pudieron cargar los productos
                    </p>
                    <button type='button' className='btn btn-primary' onClick={cargarProductos}>
                      Reintentar
                    </button>
                  </div>
                )}
                {!loading && !error && productos.length === 0 && (
                  <p className='alert alert-light border'>No hay productos disponibles</p>
                )}

                {!loading && !error && productosPasteleria.length > 0 && (
                  <section className='mt-5' aria-labelledby='pasteleria-title'>
                    <h3 id='pasteleria-title' className='h4 text-primary border-bottom pb-2 mb-3'>
                      Pastelería
                    </h3>
                    <div className='row row-cols-1 row-cols-sm-2 g-3'>
                      {productosPasteleria.map((producto) => (
                        <div className='col' key={producto.id}>
                          <article className='card h-100 border-0 bg-light shadow-sm'>
                            <div className='card-body p-4 d-flex flex-column justify-content-between gap-4'>
                              <h4 className='card-title h5 fw-semibold mb-0'>{producto.nombre}</h4>
                              <p className='card-text h5 fw-bold text-primary mb-0'>
                                {formatearPrecio(producto.precio)}
                              </p>
                              <button
                                type='button'
                                className='btn btn-primary'
                                onClick={() => agregarAlPedido(producto)}
                              >
                                Agregar al pedido
                              </button>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
            <div>
              {pedido ? (
                <section>
                  <div className='alert alert-success mt-3 mb-0' role='status'>
                    <p className='fw-bold mb-1'>¡Pedido confirmado!</p>
                    <p className='mb-0'>Pedido N° {pedido.id}</p>
                    {mesa !== null && <p className='mb-0'>Mesa: {mesa}</p>}
                    <p className='mb-0'>Estado: {pedido.estado}</p>
                    <p className='mb-0'>Total: {formatearPrecio(pedido.total)}</p>
                    <button
                      type='button'
                      className='btn btn-outline-primary mt-3'
                      onClick={actualizarEstado}
                    >
                      Actualizar estado
                    </button>
                  </div>
                </section>
              ) : (
                <>
                  <div className='mt-4'>
                    {errorPedido && (
                      <p className='alert alert-danger' role='alert'>
                        {errorPedido}
                      </p>
                    )}
                    <Carrito onConfirm={confirmarPedido} pedidoConfirmado={!!pedido} />
                    {confirmado && (
                      <p className='alert alert-success mt-3 mb-0' role='status'>
                        ¡Pedido confirmado!
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function MenuPage() {
  return (
    <CarritoProvider>
      <MenuPageContent />
    </CarritoProvider>
  );
}
