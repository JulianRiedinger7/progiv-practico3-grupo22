import { z } from 'zod';

export const pedidoSchema = z.object({
  id: z.number().int().positive(),
  items: z.array(
    z.object({
      productoId: z.number().int().positive(),
      cantidad: z.number().int().positive(),
    }),
  ),
  estado: z.enum(['pendiente', 'entregado', 'cancelado']),
  mesaId: z.number().int().positive().optional(),
  total: z.number().nonnegative(),
});

export type PedidoCreado = z.infer<typeof pedidoSchema>;
