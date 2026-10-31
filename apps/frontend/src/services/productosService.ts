import { productosSchema } from '../schemas/producto';

export async function listarProductos() {
  const response = await fetch('/api/productos');

  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}`);
  }

  return productosSchema.parse(await response.json());
}
