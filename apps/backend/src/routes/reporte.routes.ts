import { Router } from 'express';
import { ReporteController } from '../controllers/reporte.controller';

export function crearReporteRouter(controller: ReporteController) {
  const router = Router();

  router.get('/facturacion', controller.obtenerFacturacion);
  router.get('/producto_mas_vendido', controller.obtenerProductoMasVendido);

  return router;
}
