import { useCallback, useEffect, useState } from 'react';
import type { Producto } from '../types/producto';

export default function MenuPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const cargarProductos = useCallback(() => {
    setLoading(true);
    setError(false);

    fetch('/productos')
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((productos: Producto[]) => setProductos(productos))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  return (
    <main className='container py-5'>
      <h1>Cafetería Origen</h1>
      {loading && <p role='status'>Cargando productos...</p>}
      {!loading && error && (
        <>
          <p role='alert'>No se pudieron cargar los productos</p>
          <button type='button' className='btn-primary' onClick={cargarProductos}>
            Reintentar
          </button>
        </>
      )}
      {!loading && !error && productos.length === 0 && <p>No hay productos disponibles</p>}
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </main>
  );
}
