import { describe, expect, it } from 'vitest';
import type { Producto } from '../../schemas/producto';
import { buscarCafe } from '../../utils/buscarCafe';

describe('buscarCafe', () => {
  it('encuentra el producto por tipo, tamaño y variedad', () => {
    const productos: Producto[] = [
      {
        id: 4,
        nombre: 'Espresso mediano brasil',
        tipo: 'espresso',
        precioBase: 2500,
        precioFinal: 6280,
        tamano: 'mediano',
        variedad: 'brasil',
        gramos: 27,
      },
      {
        id: 5,
        nombre: 'Espresso mediano colombia',
        tipo: 'espresso',
        precioBase: 2500,
        precioFinal: 7360,
        tamano: 'mediano',
        variedad: 'colombia',
        gramos: 27,
      },
      {
        id: 14,
        nombre: 'Filtrado mediano colombia',
        tipo: 'filtrado',
        precioBase: 3200,
        precioFinal: 5900,
        tamano: 'mediano',
        variedad: 'colombia',
        gramos: 15,
      },
    ];

    expect(
      buscarCafe(productos, {
        tipo: 'espresso',
        tamano: 'mediano',
        variedad: 'colombia',
      }),
    ).toMatchObject({ id: 5, precioFinal: 7360 });
  });
});
