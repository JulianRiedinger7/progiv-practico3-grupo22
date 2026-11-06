import { Router } from 'express';
import { ReporteController } from '../controllers/reporte.controller';

export function crearReporteRouter(controller: ReporteController) {
  const router = Router();

  router.get('/reporte/facturacion', controller.obtenerFacturacion);
  router.get('/reporte/producto_mas_vendido', controller.obtenerProductoMasVendido);

  return router;
}
