import express from 'express';
import { PedidoController } from './controllers/pedido.controller';
import { ProductoController } from './controllers/producto.controller';
import { createDb } from './db/connection';
import { initializeSchema } from './db/schema';
import { ProductoRepository } from './repositories/producto.repository';
import { PedidoRepository } from './repositories/pedido.repository';
import { crearProductoRouter } from './routes/producto.routes';
import { crearPedidoRouter } from './routes/pedido.routes';
import { PedidoService } from './services/pedido.service';

export function createApp(databasePath?: string) {
  const app = express();

  const db = createDb(databasePath);
  initializeSchema(db);
  app.locals.db = db;
  const productoRepository = new ProductoRepository();
  const registrarProducto = db.prepare(
    'INSERT OR IGNORE INTO productos (id) VALUES (?)',
  );
  productoRepository
    .obtenerTodos()
    .forEach((producto) => registrarProducto.run(producto.id));

  const pedidoRepository = new PedidoRepository(db);
  const pedidoService = new PedidoService(pedidoRepository, productoRepository);
  const pedidoController = new PedidoController(pedidoService);
  const productoController = new ProductoController(productoRepository);

  app.use(express.json());
  app.use('/pedidos', crearPedidoRouter(pedidoController));
  app.use('/productos', crearProductoRouter(productoController));
  

  return app;
}
