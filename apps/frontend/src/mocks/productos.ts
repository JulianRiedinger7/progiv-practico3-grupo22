import type { Producto } from '../schemas/producto';

export const productoEspressoMock: Producto = {
  id: 1,
  nombre: 'Espresso pocillo brasil',
  tipo: 'expreso',
  tamanio: 'pocillo',
  gramosCafe: 18,
  variedad: {
    nombre: 'Brasil',
    descripcion: 'Acidez baja, cuerpo denso y notas de avellana',
  },
  precio: 5020,
};

export const productosMock: Producto[] = [
  productoEspressoMock,
  {
    id: 2,
    nombre: 'Muffin de chocolate',
    tipo: 'pasteleria',
    variedad: 'muffin_chocolate',
    precio: 2500,
  },
  {
    id: 3,
    nombre: 'Torta selva negra',
    tipo: 'pasteleria',
    variedad: 'torta_selva_negra',
    precio: 4200,
  },
];
