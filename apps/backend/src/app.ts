import express from 'express';
import { PedidoController } from './controllers/pedido.controller';
import { createDb } from './db/connection';
import { initializeSchema } from './db/schema';
import { PedidoRepository } from './repositories/pedido.repository';
import { crearPedidoRouter } from './routes/pedido.routes';
import { PedidoService } from './services/pedido.service';

export function createApp(databasePath?: string) {
  const app = express();

  const db = createDb(databasePath);
  initializeSchema(db);
  app.locals.db = db;
  const pedidoRepository = new PedidoRepository(db);
  const pedidoService = new PedidoService(pedidoRepository, (id) => {
    throw new Error(`No se configuró la búsqueda del producto ${id}`);
  });
  const pedidoController = new PedidoController(pedidoService);

  app.use(express.json());
  app.use('/pedidos', crearPedidoRouter(pedidoController));

  return app;
}
