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
        precioBase: 2500,
        precio: 6280,
        tamano: 'mediano',
        variedad: {
          nombre: 'Brasil',
          descripcion: 'Acidez baja, cuerpo denso y notas de avellana',
        },
        gramosCafe: 27,
      },
      {
        id: 5,
        nombre: 'Espresso mediano colombia',
        tipo: 'expreso',
        precioBase: 2500,
        precio: 7360,
        tamano: 'mediano',
        variedad: {
          nombre: 'Colombia',
          descripcion: 'Acidez media, cuerpo equilibrado y notas cítricas y florales',
        },
        gramosCafe: 27,
      },
      {
        id: 14,
        nombre: 'Filtrado mediano colombia',
        tipo: 'filtrado',
        precioBase: 3200,
        precio: 5900,
        tamano: 'mediano',
        variedad: {
          nombre: 'Colombia',
          descripcion: 'Acidez media, cuerpo equilibrado y notas cítricas y florales',
        },
        gramosCafe: 15,
      },
    ];

    expect(
      buscarCafe(productos, {
        tipo: 'expreso',
        tamano: 'mediano',
        variedad: 'Colombia',
      }),
    ).toMatchObject({ id: 5, precio: 7360 });
  });
});
