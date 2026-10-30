import type { Producto } from '../schemas/producto';

type CaracteristicasCafe = {
  tipo: string;
  tamano: string;
  variedad: string;
};

export function buscarCafe(
  productos: Producto[],
  caracteristicas: CaracteristicasCafe,
): Producto | undefined {
  return productos.find((p) => {
    if (p.tipo === 'pasteleria') return false;

    return (
      p.tipo === caracteristicas.tipo &&
      p.tamano === caracteristicas.tamano &&
      p.variedad === caracteristicas.variedad
    );
  });
}
