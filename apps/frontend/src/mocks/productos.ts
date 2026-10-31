import type { Producto } from '../schemas/producto';

export const productoEspressoMock: Producto = {
  id: 1,
  nombre: 'Espresso pocillo brasil',
  tipo: 'espresso',
  precioBase: 2500,
  precioFinal: 5020,
  tamano: 'pocillo',
  variedad: 'brasil',
  gramos: 18,
};

export const productosMock: Producto[] = [
  productoEspressoMock,
  {
    id: 2,
    nombre: 'Muffin de chocolate',
    tipo: 'pasteleria',
    precioBase: 3000,
    precioFinal: 3000,
    variedad: 'muffin_chocolate',
  },
  {
    id: 3,
    nombre: 'Torta selva negra',
    tipo: 'pasteleria',
    precioBase: 4200,
    precioFinal: 4200,
    variedad: 'torta_selva_negra',
  },
];
