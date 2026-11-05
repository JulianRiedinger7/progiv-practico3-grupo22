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
  { valor: 'expreso', etiqueta: 'Expreso' },
  { valor: 'filtrado', etiqueta: 'Filtrado' },
];

const tamanosCafe: { valor: Cafe['tamano']; etiqueta: string }[] = [
  { valor: 'pocillo', etiqueta: 'Pocillo' },
  { valor: 'mediano', etiqueta: 'Mediano' },
  { valor: 'taza_grande', etiqueta: 'Taza grande' },
];

const variedadesCafe: { valor: Cafe['variedad']['nombre']; etiqueta: string }[] = [
  { valor: 'Brasil', etiqueta: 'Brasil' },
  { valor: 'Colombia', etiqueta: 'Colombia' },
  { valor: 'Etiopía', etiqueta: 'Etiopía' },
];

type CafeSelectorProps = {
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
};

export default function CafeSelector({ productos, onAgregar }: CafeSelectorProps) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<Cafe['tipo'] | null>(null);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState<Cafe['tamano'] | null>(null);
  const [variedadSeleccionada, setVariedadSeleccionada] = useState<
    Cafe['variedad']['nombre'] | null
  >(null);
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
      <h3 className='h5 mb-2'>Elegí tu café en 3 pasos</h3>
      <p className='text-secondary mb-4'>
        Primero, elegí el tipo; después, el tamaño y la variedad.
      </p>

      <section className='mb-4' aria-labelledby='paso-tipo-cafe'>
        <h4 id='paso-tipo-cafe' className='h6 d-flex align-items-center gap-2 mb-3'>
          <span className='badge rounded-pill text-bg-primary'>1</span>
          ¿Qué tipo de café querés?
        </h4>
        <div className='d-flex flex-wrap gap-2' role='group' aria-label='Tipo de café'>
          {tiposCafe.map(({ valor, etiqueta }) => (
            <button
              key={valor}
              type='button'
              className={`btn btn-outline-primary rounded-pill px-4 ${tipoSeleccionado === valor ? 'active' : ''}`}
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
      </section>

      {tipoSeleccionado && (
        <section className='mb-4' aria-labelledby='paso-tamano-cafe'>
          <h4 id='paso-tamano-cafe' className='h6 d-flex align-items-center gap-2 mb-3'>
            <span className='badge rounded-pill text-bg-primary'>2</span>
            Elegí el tamaño
          </h4>
          <div className='d-flex flex-wrap gap-2' role='group' aria-label='Tamaño del café'>
            {tamanosCafe.map(({ valor, etiqueta }) => (
              <button
                key={valor}
                type='button'
                className={`btn btn-outline-primary rounded-pill px-4 ${tamanoSeleccionado === valor ? 'active' : ''}`}
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
            <section className='mt-4' aria-labelledby='paso-variedad-cafe'>
              <h4 id='paso-variedad-cafe' className='h6 d-flex align-items-center gap-2 mb-3'>
                <span className='badge rounded-pill text-bg-primary'>3</span>
                Elegí la variedad
              </h4>
              <div className='d-flex flex-wrap gap-2' role='group' aria-label='Variedad del café'>
                {variedadesCafe.map(({ valor, etiqueta }) => {
                  const producto = buscarCafe(productos, {
                    tipo: tipoSeleccionado,
                    tamano: tamanoSeleccionado,
                    variedad: valor,
                  });

                  return (
                    <div className='d-flex flex-column align-items-start gap-1' key={valor}>
                      <button
                        type='button'
                        className={`btn btn-outline-primary rounded-pill px-4 ${variedadSeleccionada === valor ? 'active' : ''}`}
                        aria-pressed={variedadSeleccionada === valor}
                        onClick={() => setVariedadSeleccionada(valor)}
                      >
                        {etiqueta}
                      </button>
                      {producto && (
                        <div>
                          <p className='small mb-0'>{producto.variedad.descripcion}</p>
                          <p className='small fw-semibold mb-0'>
                            {formatoPrecio.format(producto.precio)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </section>
      )}

      {cafeSeleccionado && (
        <article
          className='card border-primary shadow-sm mt-4'
          aria-labelledby='cafe-seleccionado-title'
        >
          <div className='card-body d-flex flex-column flex-sm-row justify-content-between gap-3'>
            <div>
              <p className='small fw-semibold text-secondary text-uppercase mb-1'>Tu selección</p>
                <h4 id='cafe-seleccionado-title' className='card-title h5 mb-2'>
                  {cafeSeleccionado.nombre}
                </h4>
                <button
                type='button'
                className='btn btn-primary'
                onClick={() => onAgregar(cafeSeleccionado)}
              >
                Agregar al pedido
              </button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
