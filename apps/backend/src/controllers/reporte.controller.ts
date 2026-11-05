import type { Request, Response } from 'express';
import type { IReporteService } from '../services/reporte.service';
import { responderErrorInterno } from '../utils/httpErrors';

export class ReporteController {
  constructor(private readonly reportes: IReporteService) {}

  obtenerFacturacion = (_req: Request, res: Response): Response => {
    try {
      const { facturacionTotal } = this.reportes.generarReporte();

      return res.status(200).json({ facturacionTotal });
    } catch {
      return responderErrorInterno(res);
    }
  };

  obtenerProductoMasVendido = (_req: Request, res: Response): Response => {
    try {
      const { productoMasVendido } = this.reportes.generarReporte();

      return res.status(200).json({ productoMasVendido });
    } catch {
      return responderErrorInterno(res);
    }
  };
}
