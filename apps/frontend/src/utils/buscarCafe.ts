import type { Producto } from '../schemas/producto';

type ProductoCafe = Extract<Producto, { tipo: 'expreso' | 'filtrado' }>;

type CaracteristicasCafe = {
  tipo: string;
  tamanio: string;
  variedad: string;
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
): ProductoCafe | undefined {
  return productos.find((p): p is ProductoCafe => {
    if (p.tipo === 'pasteleria') return false;

    return (
      p.tipo === caracteristicas.tipo &&
      p.tamanio === caracteristicas.tamanio &&
      normalizar(p.variedad.nombre) === normalizar(caracteristicas.variedad)
    );
  });
}
