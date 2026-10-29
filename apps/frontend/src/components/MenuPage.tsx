import { useEffect, useState } from 'react';
import type { Producto } from '../types/producto';

export default function MenuPage() {
  const [productos, setProductos] = useState<Producto[] | null>(null);

  useEffect(() => {
    fetch('/productos')
      .then((response) => response.json())
      .then(setProductos);
  }, []);

  return (
    <main className='container py-5'>
      <h1>Cafetería Origen</h1>
      {productos === null && <p role='status'>Cargando productos...</p>}
      {productos?.length === 0 && <p>No hay productos disponibles</p>}
      <ul>
        {productos?.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </main>
  );
}
