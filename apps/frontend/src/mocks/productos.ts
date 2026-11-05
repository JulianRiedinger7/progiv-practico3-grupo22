import type { Producto } from '../schemas/producto';

export const productoEspressoMock: Producto = {
  id: 1,
  nombre: 'Espresso pocillo brasil',
  tipo: 'expreso',
  precioBase: 2500,
  precio: 5020,
  tamano: 'pocillo',
  variedad: {
    nombre: 'Brasil',
    descripcion: 'Acidez baja, cuerpo denso y notas de avellana',
  },
  gramosCafe: 18,
};

export const productosMock: Producto[] = [
  productoEspressoMock,
  {
    id: 2,
    nombre: 'Muffin de chocolate',
    tipo: 'pasteleria',
    precioBase: 2500,
    precio: 2500,
    variedad: 'muffin_chocolate',
  },
  {
    id: 3,
    nombre: 'Torta selva negra',
    tipo: 'pasteleria',
    precioBase: 4200,
    precio: 4200,
    variedad: 'torta_selva_negra',
  },
];
