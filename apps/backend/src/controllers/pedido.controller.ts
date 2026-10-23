import type { Request, Response } from 'express';
import type { IPedidoService } from '../services/pedido.service';

export class PedidoController {
  constructor(private readonly pedidos: IPedidoService) {}

  obtenerTodos = (_req: Request, res: Response): Response => {
    try {
      return res.status(200).json(this.pedidos.obtenerTodos());
    } catch {
      return this.responderErrorInterno(res);
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
      return this.responderErrorInterno(res);
    }
  };

  private responderErrorInterno(res: Response): Response {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
