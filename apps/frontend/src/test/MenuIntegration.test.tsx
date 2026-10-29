import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MenuPage from '../components/MenuPage';

describe('MenuPage integración con API simulada', () => {
  it('muestra un producto devuelto por la API', async () => {
    render(<MenuPage />);

    await waitFor(() => {
      expect(screen.getByText('Espresso pocillo brasil')).toBeInTheDocument();
    });
  });
});
