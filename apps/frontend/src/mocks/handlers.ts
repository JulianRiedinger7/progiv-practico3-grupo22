import { http, HttpResponse } from 'msw';
import type { Producto } from '../schemas/producto';
import { productosMock } from './productos';

export function crearHandlersProductos(productos: Producto[]) {
  return [http.get('*/api/productos', () => HttpResponse.json(productos))];
}

export const handlers = crearHandlersProductos(productosMock);
