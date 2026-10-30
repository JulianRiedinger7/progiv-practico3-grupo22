import { useState } from 'react';
import type { Producto } from '../schemas/producto';
import { buscarCafe } from '../utils/buscarCafe';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

type Cafe = Exclude<Producto, { tipo: 'pasteleria' }>;

const tiposCafe: { valor: Cafe['tipo']; etiqueta: string }[] = [
  { valor: 'espresso', etiqueta: 'Expreso' },
  { valor: 'filtrado', etiqueta: 'Filtrado' },
];

const tamanosCafe: { valor: Cafe['tamano']; etiqueta: string }[] = [
  { valor: 'pocillo', etiqueta: 'Pocillo' },
  { valor: 'mediano', etiqueta: 'Mediano' },
  { valor: 'taza_grande', etiqueta: 'Taza grande' },
];

const variedadesCafe: { valor: Cafe['variedad']; etiqueta: string }[] = [
  { valor: 'brasil', etiqueta: 'Brasil' },
  { valor: 'colombia', etiqueta: 'Colombia' },
  { valor: 'etiopia', etiqueta: 'Etiopía' },
];

type CafeSelectorProps = {
  productos: Producto[];
};

export default function CafeSelector({ productos }: CafeSelectorProps) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<Cafe['tipo'] | null>(null);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState<Cafe['tamano'] | null>(null);
  const [variedadSeleccionada, setVariedadSeleccionada] = useState<Cafe['variedad'] | null>(null);
  const cafeSeleccionado =
    tipoSeleccionado && tamanoSeleccionado && variedadSeleccionada
      ? buscarCafe(productos, {
          tipo: tipoSeleccionado,
          tamano: tamanoSeleccionado,
          variedad: variedadSeleccionada,
        })
      : undefined;

  return (
    <div className='mb-4'>
      <h3 className='h5 mb-3'>Elegí la bebida</h3>
      <div className='btn-group' role='group' aria-label='Tipo de café'>
        {tiposCafe.map(({ valor, etiqueta }) => (
          <button
            key={valor}
            type='button'
            className={`btn btn-outline-primary ${tipoSeleccionado === valor ? 'active' : ''}`}
            aria-pressed={tipoSeleccionado === valor}
            onClick={() => {
              setTipoSeleccionado(valor);
              setTamanoSeleccionado(null);
              setVariedadSeleccionada(null);
            }}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      {tipoSeleccionado && (
        <div className='mt-3'>
          <h4 className='h6 mb-2'>Elegí el tamaño</h4>
          <div className='btn-group' role='group' aria-label='Tamaño del café'>
            {tamanosCafe.map(({ valor, etiqueta }) => (
              <button
                key={valor}
                type='button'
                className={`btn btn-outline-primary ${tamanoSeleccionado === valor ? 'active' : ''}`}
                aria-pressed={tamanoSeleccionado === valor}
                onClick={() => {
                  setTamanoSeleccionado(valor);
                  setVariedadSeleccionada(null);
                }}
              >
                {etiqueta}
              </button>
            ))}
          </div>

          {tamanoSeleccionado && (
            <div className='mt-3'>
              <h5 className='h6 mb-2'>Elegí la variedad</h5>
              <div className='btn-group' role='group' aria-label='Variedad del café'>
                {variedadesCafe.map(({ valor, etiqueta }) => (
                  <button
                    key={valor}
                    type='button'
                    className={`btn btn-outline-primary ${variedadSeleccionada === valor ? 'active' : ''}`}
                    aria-pressed={variedadSeleccionada === valor}
                    onClick={() => setVariedadSeleccionada(valor)}
                  >
                    {etiqueta}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {cafeSeleccionado && (
        <article className='card mt-4' aria-labelledby='cafe-seleccionado-title'>
          <div className='card-body'>
            <h4 id='cafe-seleccionado-title' className='card-title h5'>
              {cafeSeleccionado.nombre}
            </h4>
            <p className='card-text fw-semibold text-primary mb-0'>
              {formatoPrecio.format(cafeSeleccionado.precioFinal)}
            </p>
          </div>
        </article>
      )}
    </div>
  );
}
