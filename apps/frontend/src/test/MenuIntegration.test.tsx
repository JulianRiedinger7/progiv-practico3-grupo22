import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import MenuPage from '../components/MenuPage';
import { server } from './mocks/server';

describe('MenuPage integración con API simulada', () => {
  it('muestra la pastelería y el precio recibido en el contrato actual de productos', async () => {
    server.use(
      http.get('*/api/productos', () =>
        HttpResponse.json([
          {
            id: 19,
            nombre: 'Pasteleria muffin chocolate',
            tipo: 'pasteleria',
            variedad: 'muffin_chocolate',
            precio: 2500,
          },
        ]),
      ),
    );

    render(<MenuPage />);

    expect(await screen.findByText('Pasteleria muffin chocolate')).toBeInTheDocument();
    expect(screen.getByText(/2\.500/)).toBeInTheDocument();
  });

  it('muestra la pastelería al abrir el menú sin seleccionar opciones', async () => {
    server.use(
      http.get('*/api/productos', () =>
        HttpResponse.json([
          {
            id: 1,
            nombre: 'Espresso pocillo brasil',
            tipo: 'expreso',
            tamanio: 'pocillo',
            gramosCafe: 18,
            variedad: {
              nombre: 'Brasil',
              descripcion: 'Acidez baja, cuerpo denso y notas de avellana',
            },
            precio: 5020,
          },
          {
            id: 2,
            nombre: 'Muffin de chocolate',
            tipo: 'pasteleria',
            variedad: 'muffin_chocolate',
            precio: 2500,
          },
          {
            id: 3,
            nombre: 'Pasteleria torta selva_negra',
            tipo: 'pasteleria',
            variedad: 'torta_selva_negra',
            precio: 4200,
          },
        ]),
      ),
    );

    render(<MenuPage />);

    expect(await screen.findByText('Muffin de chocolate')).toBeInTheDocument();
    expect(screen.queryByText('Espresso pocillo brasil')).not.toBeInTheDocument();
    expect(screen.getByText(/2\.500/)).toBeInTheDocument();
    expect(screen.getByText(/4\.200/)).toBeInTheDocument();
    const pasteleria = await screen.findByRole('region', { name: 'Pastelería' });
    expect(within(pasteleria).getAllByRole('button', { name: 'Agregar al pedido' })).toHaveLength(
      2,
    );
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

  it('muestra un mensaje de error cuando la API no responde', async () => {
    server.use(http.get('*/api/productos', () => HttpResponse.error()));

    render(<MenuPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudieron cargar los productos',
    );
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  });

  it('muestra un mensaje de error cuando la respuesta de productos no cumple el contrato', async () => {
    server.use(
      http.get('*/api/productos', () =>
        HttpResponse.json([
          { id: 1, nombre: 'Café raro', tipo: 'bebida_desconocida', precio: 'gratis' },
        ]),
      ),
    );

    render(<MenuPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudieron cargar los productos',
    );
    expect(screen.queryByText('Café raro')).not.toBeInTheDocument();
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
            tipo: 'expreso',
            tamanio: 'pocillo',
            gramosCafe: 18,
            variedad: {
              nombre: 'Brasil',
              descripcion: 'Acidez baja, cuerpo denso y notas de avellana',
            },
            precio: 5020,
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

  it('muestra el error de la API y conserva el carrito si rechaza el pedido', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('*/api/productos', () =>
        HttpResponse.json([
          {
            id: 2,
            nombre: 'Muffin de chocolate',
            tipo: 'pasteleria',
            precio: 2500,
            variedad: 'muffin_chocolate',
          },
        ]),
      ),
      http.post('*/api/pedidos', () =>
        HttpResponse.json({ error: 'La mesa no existe' }, { status: 400 }),
      ),
    );

    render(<MenuPage />);

    const pasteleria = await screen.findByRole('region', { name: 'Pastelería' });
    await user.click(within(pasteleria).getByRole('button', { name: 'Agregar al pedido' }));
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('La mesa no existe');
    expect(screen.getByText('Cantidad: 1')).toBeInTheDocument();
    expect(screen.getAllByText('Muffin de chocolate')).toHaveLength(2);
  });

  it('muestra un error y conserva el carrito si la respuesta al crear el pedido no cumple el contrato', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('*/api/productos', () =>
        HttpResponse.json([
          {
            id: 2,
            nombre: 'Muffin de chocolate',
            tipo: 'pasteleria',
            precio: 2500,
            variedad: 'muffin_chocolate',
          },
        ]),
      ),
      http.post('*/api/pedidos', () =>
        HttpResponse.json({ id: 15, total: 'mucho' }, { status: 201 }),
      ),
    );

    window.history.pushState({}, '', '/');
    render(<MenuPage />);

    const pasteleria = await screen.findByRole('region', { name: 'Pastelería' });
    await user.click(within(pasteleria).getByRole('button', { name: 'Agregar al pedido' }));
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText(/Pedido N°/)).not.toBeInTheDocument();
    expect(screen.getByText('Cantidad: 1')).toBeInTheDocument();
  });

  it('confirma el pedido y muestra número, mesa, estado y total devueltos por la API', async () => {
    const user = userEvent.setup();
    let pedidoIdConsultado: string | null = null;
    let cuerpoRecibido: unknown;

    server.use(
      http.get('*/api/productos', () =>
        HttpResponse.json([
          {
            id: 2,
            nombre: 'Muffin de chocolate',
            tipo: 'pasteleria',
            variedad: 'muffin_chocolate',
            precio: 2500,
          },
        ]),
      ),
      http.post('*/api/pedidos', async ({ request }) => {
        cuerpoRecibido = await request.json();
        return HttpResponse.json(
          {
            id: 15,
            mesaId: 4,
            items: [{ productoId: 2, cantidad: 1 }],
            estado: 'pendiente',
            total: 2500,
          },
          { status: 201 },
        );
      }),
      http.get('*/api/pedidos/:id', ({ params }) => {
        pedidoIdConsultado = String(params.id);
        return HttpResponse.json({
          id: 15,
          mesaId: 4,
          items: [{ productoId: 2, cantidad: 1 }],
          estado: 'entregado',
          total: 2500,
        });
      }),
    );

    window.history.pushState({}, '', '/?mesa=4');
    render(<MenuPage />);

    const pasteleria = await screen.findByRole('region', { name: 'Pastelería' });
    await user.click(within(pasteleria).getByRole('button', { name: 'Agregar al pedido' }));
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(await screen.findByText('Pedido N° 15')).toBeInTheDocument();
    expect(screen.getByText(/Estado: pendiente/i)).toBeInTheDocument();
    expect(screen.getByText(/2\.500/)).toBeInTheDocument();
    expect(cuerpoRecibido).toEqual({
      mesaId: 4,
      items: [{ productoId: 2, cantidad: 1 }],
    });

    await user.click(screen.getByRole('button', { name: 'Actualizar estado' }));

    expect(await screen.findByText(/Estado: entregado/i)).toBeInTheDocument();
    expect(screen.getByText('Pedido N° 15')).toBeInTheDocument();
    expect(pedidoIdConsultado).toBe('15');
  });
});
