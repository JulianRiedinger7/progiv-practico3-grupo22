import type { Producto } from '../schemas/producto';

type Cafe = Exclude<Producto, { tipo: "pasteleria" }>;

type CaracteristicasCafe = {
  tipo: Cafe["tipo"];
  tamanio: Cafe["tamano"];
  variedad: Cafe["variedad"]["nombre"];
};

function normalizar(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function buscarCafe(
  productos: Producto[],
  caracteristicas: CaracteristicasCafe,
): Cafe | undefined {
  return productos.find((p): p is Cafe => {
    if (p.tipo === 'pasteleria') return false;

    return (
      p.tipo === caracteristicas.tipo &&
      p.tamanio === caracteristicas.tamanio &&
      normalizar(p.variedad.nombre) === normalizar(caracteristicas.variedad)
    );
  });
}
