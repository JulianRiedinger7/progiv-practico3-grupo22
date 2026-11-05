import { CafeEspresso } from '../models/CafeEspresso';
import { CafeFiltrado } from '../models/CafeFiltrado';
import { Pasteleria } from '../models/Pasteleria';
import type { Producto } from '../models/Producto';

type DefinicionProducto =
  | {
      id: number;
      tipo: 'espresso' | 'filtrado';
      tamano: 'pocillo' | 'mediano' | 'taza_grande';
      variedad: 'brasil' | 'colombia' | 'etiopia';
    }
  | {
      id: number;
      tipo: 'pasteleria';
      variedad: 'muffin_chocolate' | 'torta_selva_negra';
    };

const definicionesCatalogo: DefinicionProducto[] = [
  { id: 1, tipo: 'espresso', tamano: 'pocillo', variedad: 'brasil' },
  { id: 2, tipo: 'espresso', tamano: 'pocillo', variedad: 'colombia' },
  { id: 3, tipo: 'espresso', tamano: 'pocillo', variedad: 'etiopia' },
  { id: 4, tipo: 'espresso', tamano: 'mediano', variedad: 'brasil' },
  { id: 5, tipo: 'espresso', tamano: 'mediano', variedad: 'colombia' },
  { id: 6, tipo: 'espresso', tamano: 'mediano', variedad: 'etiopia' },
  { id: 7, tipo: 'espresso', tamano: 'taza_grande', variedad: 'brasil' },
  { id: 8, tipo: 'espresso', tamano: 'taza_grande', variedad: 'colombia' },
  { id: 9, tipo: 'espresso', tamano: 'taza_grande', variedad: 'etiopia' },
  { id: 10, tipo: 'filtrado', tamano: 'pocillo', variedad: 'brasil' },
  { id: 11, tipo: 'filtrado', tamano: 'pocillo', variedad: 'colombia' },
  { id: 12, tipo: 'filtrado', tamano: 'pocillo', variedad: 'etiopia' },
  { id: 13, tipo: 'filtrado', tamano: 'mediano', variedad: 'brasil' },
  { id: 14, tipo: 'filtrado', tamano: 'mediano', variedad: 'colombia' },
  { id: 15, tipo: 'filtrado', tamano: 'mediano', variedad: 'etiopia' },
  { id: 16, tipo: 'filtrado', tamano: 'taza_grande', variedad: 'brasil' },
  { id: 17, tipo: 'filtrado', tamano: 'taza_grande', variedad: 'colombia' },
  { id: 18, tipo: 'filtrado', tamano: 'taza_grande', variedad: 'etiopia' },
  { id: 19, tipo: 'pasteleria', variedad: 'muffin_chocolate' },
  { id: 20, tipo: 'pasteleria', variedad: 'torta_selva_negra' },
];

function crearProducto(definicion: DefinicionProducto): Producto {
  switch (definicion.tipo) {
    case 'espresso':
      return new CafeEspresso(
        definicion.id,
        definicion.tamano,
        definicion.variedad,
      );
    case 'filtrado':
      return new CafeFiltrado(
        definicion.id,
        definicion.tamano,
        definicion.variedad,
      );
    case 'pasteleria':
      return new Pasteleria(definicion.id, definicion.variedad);
  }
}

export const catalogo: Producto[] = definicionesCatalogo.map(crearProducto);
