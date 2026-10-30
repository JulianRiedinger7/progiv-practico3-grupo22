import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import MenuPage from '../components/MenuPage';
import { server } from './mocks/server';

describe('MenuPage integración con API simulada', () => {
  it('muestra la pastelería al abrir el menú sin seleccionar opciones', async () => {
    server.use(
      http.get('*/api/productos', () =>
        HttpResponse.json([
          {
            id: 1,
            nombre: 'Espresso pocillo brasil',
            tipo: 'espresso',
            precioBase: 2500,
            precioFinal: 5020,
            tamano: 'pocillo',
            variedad: 'brasil',
            gramos: 18,
          },
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
            nombre: 'Pasteleria torta selva_negra',
            tipo: 'pasteleria',
            precioBase: 4200,
            precioFinal: 4200,
            variedad: 'torta_selva_negra',
          },
        ]),
      ),
    );

    render(<MenuPage />);

    expect(await screen.findByText('Muffin de chocolate')).toBeInTheDocument();
    expect(screen.queryByText('Espresso pocillo brasil')).not.toBeInTheDocument();
    expect(screen.getByText(/3\.000/)).toBeInTheDocument();
    expect(screen.getByText(/4\.200/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Agregar al pedido' })).toHaveLength(2);
  });

  it('muestra un producto devuelto por la API después de completar su selección', async () => {
    const user = userEvent.setup();
    render(<MenuPage />);

    await user.click(await screen.findByRole('button', { name: 'Expreso' }));
    await user.click(screen.getByRole('button', { name: 'Pocillo' }));
    await user.click(screen.getByRole('button', { name: 'Brasil' }));

    expect(
      await screen.findByRole('heading', { name: 'Espresso pocillo brasil' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Agregar al pedido' })).toBeInTheDocument();
  });

  it('muestra el precio final del café seleccionado', async () => {
    const user = userEvent.setup();
    render(<MenuPage />);

    await user.click(await screen.findByRole('button', { name: 'Expreso' }));
    await user.click(screen.getByRole('button', { name: 'Pocillo' }));
    await user.click(screen.getByRole('button', { name: 'Brasil' }));

    expect(await screen.findByText(/5\.020/)).toBeInTheDocument();
  });

  it('muestra un mensaje cuando la API no devuelve productos', async () => {
    server.use(
      http.get('*/api/productos', async () => {
        await delay(150);
        return HttpResponse.json([]);
      }),
    );

    render(<MenuPage />);

    expect(screen.queryByText('No hay productos disponibles')).not.toBeInTheDocument();
    expect(await screen.findByText('No hay productos disponibles')).toBeInTheDocument();
  });

  it('muestra un estado de carga mientras espera la respuesta de la API', async () => {
    server.use(
      http.get('*/api/productos', async () => {
        await delay(150);
        return HttpResponse.json([]);
      }),
    );

    render(<MenuPage />);

    expect(screen.getByRole('status')).toHaveTextContent('Cargando productos...');
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  it('muestra un mensaje de error cuando la API responde con un error', async () => {
    server.use(http.get('*/api/productos', () => HttpResponse.json([], { status: 500 })));

    render(<MenuPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudieron cargar los productos',
    );
  });

  it('permite reintentar la carga de productos después de un error', async () => {
    const user = userEvent.setup();
    let cantidadDePeticiones = 0;

    server.use(
      http.get('*/api/productos', () => {
        cantidadDePeticiones += 1;

        if (cantidadDePeticiones === 1) {
          return HttpResponse.json([], { status: 500 });
        }

        return HttpResponse.json([
          {
            id: 1,
            nombre: 'Espresso pocillo brasil',
            tipo: 'espresso',
            precioBase: 2500,
            precioFinal: 5020,
            tamano: 'pocillo',
            variedad: 'brasil',
            gramos: 18,
          },
        ]);
      }),
    );

    render(<MenuPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudieron cargar los productos',
    );

    await user.click(screen.getByRole('button', { name: 'Reintentar' }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    await user.click(await screen.findByRole('button', { name: 'Expreso' }));
    await user.click(screen.getByRole('button', { name: 'Pocillo' }));
    await user.click(screen.getByRole('button', { name: 'Brasil' }));

    expect(
      await screen.findByRole('heading', { name: 'Espresso pocillo brasil' }),
    ).toBeInTheDocument();
  });
});
