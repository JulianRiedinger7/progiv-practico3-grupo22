import type { Response } from 'express';

export function responderErrorInterno(res: Response): Response {
  return res.status(500).json({ error: 'Error interno del servidor' });
}
