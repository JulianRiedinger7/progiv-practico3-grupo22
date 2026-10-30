import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MenuPage from '../../components/MenuPage';

describe('MenuPage', () => {
  it('muestra el nombre de la cafetería como título principal', () => {
    render(<MenuPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Cafetería Origen' })).toBeInTheDocument();
  });

  it('muestra en el encabezado la mesa indicada en la URL', () => {
    window.history.replaceState({}, '', '/?mesa=4');

    render(<MenuPage />);

    expect(screen.getByText('Mesa 4')).toBeInTheDocument();
  });

  it('indica que el pedido es para retirar en barra cuando no se recibe una mesa', () => {
    window.history.replaceState({}, '', '/');

    render(<MenuPage />);

    expect(screen.getByText('Para retirar en barra')).toBeInTheDocument();
  });

  it('muestra expreso y filtrado como opciones de bebida', async () => {
    render(<MenuPage />);

    expect(await screen.findByRole('button', { name: 'Expreso' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filtrado' })).toBeInTheDocument();
  });

  it('muestra los tamaños disponibles después de elegir un tipo de café', async () => {
    const user = userEvent.setup();
    render(<MenuPage />);

    await user.click(await screen.findByRole('button', { name: 'Expreso' }));

    expect(screen.getByRole('button', { name: 'Pocillo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mediano' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Taza grande' })).toBeInTheDocument();
  });
});
