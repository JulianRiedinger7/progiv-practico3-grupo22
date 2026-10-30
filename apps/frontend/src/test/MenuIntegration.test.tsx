import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import MenuPage from '../components/MenuPage';
import { server } from './mocks/server';

describe('MenuPage integración con API simulada', () => {
  it('muestra un producto devuelto por la API', async () => {
    render(<MenuPage />);

    await waitFor(() => {
      expect(screen.getByText('Espresso pocillo brasil')).toBeInTheDocument();
    });
  });

  it('muestra el precio final devuelto por la API', async () => {
    render(<MenuPage />);

    expect(await screen.findByText(/\$\s*5\.020/)).toBeInTheDocument();
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
    server.use(
      http.get('*/api/productos', () => HttpResponse.json([], { status: 500 })),
    );

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
          { id: 1, nombre: 'Espresso pocillo brasil', precioFinal: 5020 },
        ]);
      }),
    );

    render(<MenuPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudieron cargar los productos',
    );

    await user.click(screen.getByRole('button', { name: 'Reintentar' }));

    expect(await screen.findByText('Espresso pocillo brasil')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
