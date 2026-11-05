import type { Producto } from '../schemas/producto';

type Cafe = Exclude<Producto, { tipo: "pasteleria" }>;

type CaracteristicasCafe = {
  tipo: Cafe["tipo"];
  tamano: Cafe["tamano"];
  variedad: Cafe["variedad"]["nombre"];
};

export function buscarCafe(
  productos: Producto[],
  caracteristicas: CaracteristicasCafe,
): Cafe | undefined {
  return productos.find((p): p is Cafe => {
    if (p.tipo === 'pasteleria') return false;

    return (
      p.tipo === caracteristicas.tipo &&
      p.tamano === caracteristicas.tamano &&
      p.variedad.nombre === caracteristicas.variedad
    );
  });
}
