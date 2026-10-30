import { z } from 'zod';

export const productoSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1),
  precioFinal: z.number().nonnegative(),
});

export const productosSchema = z.array(productoSchema);

export type Producto = z.infer<typeof productoSchema>;
