import { render, screen, waitFor } from '@testing-library/react';
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

  it('muestra un mensaje cuando la API no devuelve productos', async () => {
    server.use(
      http.get('*/productos', async () => {
        await delay(150);
        return HttpResponse.json([]);
      }),
    );

    render(<MenuPage />);

    expect(screen.queryByText('No hay productos disponibles')).not.toBeInTheDocument();
    expect(await screen.findByText('No hay productos disponibles')).toBeInTheDocument();
  });
});
