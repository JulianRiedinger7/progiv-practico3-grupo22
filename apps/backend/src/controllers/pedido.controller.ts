import type { Request, Response } from 'express';
import type { IPedidoService } from '../services/pedido.service';

export class PedidoController {
  constructor(private readonly pedidos: IPedidoService) {}

  obtenerTodos = (_req: Request, res: Response): Response => {
    return res.status(200).json(this.pedidos.obtenerTodos());
  };
}
