import { useState } from 'react';
import type { Producto } from '../schemas/producto';

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

export default function CafeSelector() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<Cafe['tipo'] | null>(null);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState<Cafe['tamano'] | null>(null);
  const [variedadSeleccionada, setVariedadSeleccionada] = useState<Cafe['variedad'] | null>(null);

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
    </div>
  );
}
