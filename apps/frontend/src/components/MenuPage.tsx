import { useCallback, useEffect, useState } from 'react';
import MenuHeader from './MenuHeader';
import CafeSelector from './CafeSelector';
import { listarProductos } from '../services/productosService';
import type { Producto } from '../schemas/producto';
import { leerMesaDesdeUrl } from '../utils/mesa';

export default function MenuPage() {
  const mesa = leerMesaDesdeUrl(window.location.search);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

          </section>
        </div>
      </div>
    </main>
  );
}
