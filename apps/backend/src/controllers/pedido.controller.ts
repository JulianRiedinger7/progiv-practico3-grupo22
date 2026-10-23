import type { Request, Response } from 'express';
import { z } from 'zod';
import type { IPedidoService } from '../services/pedido.service';
import { responderErrorInterno } from '../utils/httpErrors';

const nuevoPedidoSchema = z.object({
  items: z
    .array(
      z.object({
        productoId: z.number({ error: 'productoId debe ser un número' }),
        cantidad: z.number({ error: 'cantidad debe ser un número' }),
      }),
    )
    .min(1, { error: 'El pedido debe incluir al menos un ítem' }),
  estado: z
    .enum(['pendiente', 'entregado', 'cancelado'], {
      error: 'estado debe ser pendiente, entregado o cancelado',
    })
    .optional(),
});

export class PedidoController {
  constructor(private readonly pedidos: IPedidoService) {}

  obtenerTodos = (_req: Request, res: Response): Response => {
    try {
      return res.status(200).json(this.pedidos.obtenerTodos());
    } catch {
      return responderErrorInterno(res);
    }
  };

  obtenerPorId = (req: Request, res: Response): Response => {
    try {
      const pedido = this.pedidos.obtenerPorId(Number(req.params.id));

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      return res.status(200).json(pedido);
    } catch {
      return responderErrorInterno(res);
    }
  };

  crear = (req: Request, res: Response): Response => {
    try {
      const resultado = nuevoPedidoSchema.safeParse(req.body);

      if (!resultado.success) {
        return res.status(400).json({
          error: 'Datos del pedido inválidos',
          detalles: resultado.error.issues.map((issue) => ({
            campo: issue.path.join('.'),
            mensaje: issue.message,
          })),
        });
      }

      return res.status(201).json(this.pedidos.crear(resultado.data));
    } catch {
      return responderErrorInterno(res);
    }
  };
}
