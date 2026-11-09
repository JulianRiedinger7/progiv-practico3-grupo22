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
import { ReporteController } from './controllers/reporte.controller';
import { crearReporteRouter } from './routes/reporte.routes';
import { ReporteService } from './services/reporte.service';

export function createApp(databasePath?: string) {
  const app = express();

  const db = createDb(databasePath);
  initializeSchema(db);
  app.locals.db = db;
  const productoRepository = new ProductoRepository();
  const registrarProducto = db.prepare(
    'INSERT OR IGNORE INTO productos (id) VALUES (?)',
  );
  const cargarCatalogo = () => {
    productoRepository
      .obtenerTodos()
      .forEach((producto) => registrarProducto.run(producto.id));
  };
  cargarCatalogo();

  const pedidoRepository = new PedidoRepository(db);
  const pedidoService = new PedidoService(pedidoRepository, productoRepository);
  const pedidoController = new PedidoController(pedidoService);
  const productoController = new ProductoController(productoRepository);
  const reporteService = new ReporteService(pedidoRepository, productoRepository);
  const reporteController = new ReporteController(reporteService);

  app.use(express.json());
  app.use('/pedidos', crearPedidoRouter(pedidoController));
  app.use('/productos', crearProductoRouter(productoController));
  app.use('/reportes', crearReporteRouter(reporteController));

  if (process.env.NODE_ENV === 'test') {
    app.post('/__test__/reset', (_req, res) => {
      db.exec(`
        DELETE FROM pedido_items;
        DELETE FROM pedidos;
        DELETE FROM productos;
        DELETE FROM sqlite_sequence WHERE name IN ('pedidos', 'pedido_items');
      `);
      return res.status(204).end();
    });

    app.post('/__test__/seed', (_req, res) => {
      cargarCatalogo();
      return res.status(204).end();
    });
  }

  return app;
}
