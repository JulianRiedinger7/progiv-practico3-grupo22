import { z } from 'zod';

const productoComunSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1),
  precioBase: z.number().nonnegative(),
  precioFinal: z.number().nonnegative(),
});

const productoCafeSchema = productoComunSchema.extend({
  tipo: z.enum(['espresso', 'filtrado']),
  tamano: z.enum(['pocillo', 'mediano', 'taza_grande']),
  variedad: z.enum(['brasil', 'colombia', 'etiopia']),
  gramos: z.number().positive(),
});

const productoPasteleriaSchema = productoComunSchema.extend({
  tipo: z.literal('pasteleria'),
  variedad: z.enum(['muffin_chocolate', 'torta_selva_negra']),
});

export const productoSchema = z.discriminatedUnion('tipo', [
  productoCafeSchema,
  productoPasteleriaSchema,
]);

export const productosSchema = z.array(productoSchema);

export type Producto = z.infer<typeof productoSchema>;
