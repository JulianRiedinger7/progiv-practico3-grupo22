import express from 'express';
import { createDb } from './db/connection';
import { initializeSchema } from './db/schema';
import { PedidoRepository } from './repositories/pedido.repository';

export function createApp(databasePath?: string) {
  const app = express();

  const db = createDb(databasePath);
  initializeSchema(db);
  app.locals.db = db;
  const pedidos = new PedidoRepository(db);
  app.use(express.json());
  app.get('/health', (_request, response) => {
    response.status(200).json({ status: 'ok' });
  });
  app.get('/pedidos', (_request, response) => {
    const respuesta = pedidos.obtenerTodos().map((pedido) => ({
      id: pedido.getId(),
      items: pedido.getItems(),
      estado: pedido.getEstado(),
      total: 0,
    }));

    response.status(200).json(respuesta);
  });

  return app;
}
