import { useCallback, useEffect, useState } from 'react';
import MenuHeader from './MenuHeader';
import CafeSelector from './CafeSelector';
import { listarProductos } from '../services/productosService';
import type { Producto } from '../schemas/producto';
import { leerMesaDesdeUrl } from '../utils/mesa';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export default function MenuPage() {
  const mesa = leerMesaDesdeUrl(window.location.search);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const productosPasteleria = productos.filter((producto) => producto.tipo === 'pasteleria');

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

            <CafeSelector productos={productos} />

            {loading && (
              <p className='alert alert-info' role='status'>
                Cargando productos...
              </p>
            )}
            {!loading && error && (
              <div className='alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3'>
                <p role='alert' className='mb-0'>No se pudieron cargar los productos</p>
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
                            {formatoPrecio.format(producto.precioFinal)}
                          </p>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </section>
        </div>
      </div>
    </main>
  );
}
