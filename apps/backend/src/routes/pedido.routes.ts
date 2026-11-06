import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller';

export function crearPedidoRouter(controller: PedidoController) {
  const router = Router();

  router.get('/', controller.obtenerTodos);
  router.get('/:id', controller.obtenerPorId);
  router.post('/', controller.crear);

  return router;
}
