import { z } from 'zod';

const productoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

const productosSchema = z.array(productoSchema);

export async function listarProductos() {
  const response = await fetch('/api/productos');

  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}`);
  }

  return productosSchema.parse(await response.json());
}
