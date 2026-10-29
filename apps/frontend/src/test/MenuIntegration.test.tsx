import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
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
      http.get('*/productos', () => HttpResponse.json([])),
    );

    render(<MenuPage />);

    expect(await screen.findByText('No hay productos disponibles')).toBeInTheDocument();
  });
});
