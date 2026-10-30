import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/productos', () =>
    HttpResponse.json([
      {
        id: 1,
        nombre: 'Espresso pocillo brasil',
        tipo: 'espresso',
        precioBase: 2500,
        precioFinal: 5020,
        tamano: 'pocillo',
        variedad: 'brasil',
        gramos: 18,
      },
    ]),
  ),
];
