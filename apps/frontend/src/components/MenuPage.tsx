import { useCallback, useEffect, useState } from 'react';
import MenuHeader from './MenuHeader';
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
  const [tipoCafeSeleccionado, setTipoCafeSeleccionado] = useState<'espresso' | 'filtrado' | null>(null);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState<'pocillo' | 'mediano' | 'taza_grande' | null>(null);

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

            <div className='mb-4'>
              <h3 className='h5 mb-3'>Elegí la bebida</h3>
              <div className='btn-group' role='group' aria-label='Tipo de café'>
                <button
                  type='button'
                  className={`btn btn-outline-primary ${tipoCafeSeleccionado === 'espresso' ? 'active' : ''}`}
                  aria-pressed={tipoCafeSeleccionado === 'espresso'}
                  onClick={() => setTipoCafeSeleccionado('espresso')}
                >
                  Expreso
                </button>
                <button
                  type='button'
                  className={`btn btn-outline-primary ${tipoCafeSeleccionado === 'filtrado' ? 'active' : ''}`}
                  aria-pressed={tipoCafeSeleccionado === 'filtrado'}
                  onClick={() => setTipoCafeSeleccionado('filtrado')}
                >
                  Filtrado
                </button>
              </div>
              {tipoCafeSeleccionado && (
                <div className='mt-3'>
                  <h4 className='h6 mb-2'>Elegí el tamaño</h4>
                  <div className='btn-group' role='group' aria-label='Tamaño del café'>
                    <button type='button' className='btn btn-outline-primary' onClick={() => setTamanoSeleccionado('pocillo')}>Pocillo</button>
                    <button type='button' className='btn btn-outline-primary' onClick={() => setTamanoSeleccionado('mediano')}>Mediano</button>
                    <button type='button' className='btn btn-outline-primary' onClick={() => setTamanoSeleccionado('taza_grande')}>Taza grande</button>
                  </div>
                  {tamanoSeleccionado && (
                    <div className='mt-3'>
                      <h5 className='h6 mb-2'>Elegí la variedad</h5>
                      <div className='btn-group' role='group' aria-label='Variedad del café'>
                        <button type='button' className='btn btn-outline-primary'>Brasil</button>
                        <button type='button' className='btn btn-outline-primary'>Colombia</button>
                        <button type='button' className='btn btn-outline-primary'>Etiopía</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

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

            <ul className='list-group list-group-flush'>
              {productos.map((producto) => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center gap-3 px-0 py-3 bg-transparent'
                  key={producto.id}
                >
                  <span>{producto.nombre}</span>
                  <span className='fw-semibold text-primary text-nowrap'>
                    {formatoPrecio.format(producto.precioFinal)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
