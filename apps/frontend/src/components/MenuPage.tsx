import { useEffect, useState } from 'react';

type Producto = {
  id: number;
  nombre: string;
};

export default function MenuPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('/productos')
      .then((response) => response.json())
      .then(setProductos);
  }, []);

  return (
    <main className='container py-5'>
      <h1>Cafetería Origen</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </main>
  );
}
