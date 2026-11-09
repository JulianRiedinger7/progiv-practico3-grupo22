import { describe, expect, it } from 'vitest';
import type { Producto } from '../../schemas/producto';
import { buscarCafe } from '../../utils/buscarCafe';

describe('buscarCafe', () => {
  it('encuentra el producto por tipo, tamaño y variedad', () => {
    const productos: Producto[] = [
      {
        id: 4,
        nombre: 'Espresso mediano brasil',
        tipo: 'expreso',
        tamanio: 'mediano',
        gramosCafe: 27,
        variedad: {
          nombre: 'Brasil',
          descripcion: 'Acidez baja, cuerpo denso y notas de avellana',
        },
        precio: 6280,
      },
      {
        id: 5,
        nombre: 'Espresso mediano colombia',
        tipo: 'expreso',
        tamanio: 'mediano',
        gramosCafe: 27,
        variedad: {
          nombre: 'Colombia',
          descripcion: 'Dulzor a caramelo y acidez cítrica',
        },
        precio: 7360,
      },
      {
        id: 14,
        nombre: 'Filtrado mediano colombia',
        tipo: 'filtrado',
        tamanio: 'mediano',
        gramosCafe: 15,
        variedad: {
          nombre: 'Colombia',
          descripcion: 'Dulzor a caramelo y acidez cítrica',
        },
        precio: 5900,
      },
    ];

    expect(
      buscarCafe(productos, {
        tipo: 'expreso',
        tamanio: 'mediano',
        variedad: 'Colombia',
      }),
    ).toMatchObject({ id: 5, precio: 7360 });
  });
});
