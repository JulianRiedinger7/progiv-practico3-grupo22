import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MenuPage from './MenuPage';

describe('MenuPage', () => {
  it('muestra el nombre de la cafetería como título principal', () => {
    render(<MenuPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Cafetería Origen' })).toBeInTheDocument();
  });
});
