import { z } from "zod";

const variedadCafeSchema = z.object({
  nombre: z.enum(["Brasil", "Colombia", "Etiopía"]),
  descripcion: z.string().min(1),
});

const productoComunSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1),
  precio: z.number().nonnegative(),
});

const productoCafeSchema = productoComunSchema.extend({
  tipo: z.enum(['expreso', 'filtrado']),
  tamanio: z.enum(['pocillo', 'mediano', 'taza_grande']),
  gramosCafe: z.number().positive(),
  variedad: variedadCafeSchema,
});

const productoPasteleriaSchema = productoComunSchema.extend({
  tipo: z.literal("pasteleria"),
  variedad: z.enum(["muffin_chocolate", "torta_selva_negra"]),
});

export const productoSchema = z.discriminatedUnion("tipo", [
  productoCafeSchema,
  productoPasteleriaSchema,
]);

export const productosSchema = z.array(productoSchema);

export type Producto = z.infer<typeof productoSchema>;
