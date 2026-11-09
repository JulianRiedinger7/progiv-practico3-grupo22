# Cafetería Origen

Menú de mesa para la cafetería. Es un monorepo con la API (Express + SQLite) en `apps/backend` y el front (Vite + React + TypeScript) en `apps/frontend`.

## Cómo levantar la API y el front

Hace falta Node 22.13 o superior y pnpm.

```sh
pnpm install
cp .env.example .env    # en PowerShell: Copy-Item .env.example .env
pnpm dev
```

- La API queda en http://localhost:3000.
- El front queda en http://localhost:5173. Para abrirlo como si fuera desde el QR de una mesa: http://localhost:5173/?mesa=4

El front le pega a la API a través de un proxy de Vite: las llamadas a `/api/...` se redirigen a `http://localhost:3000/...`. Por eso no hace falta habilitar CORS.

Variables del `.env`:

- `SQLITE_DATABASE_PATH`: archivo de la base de datos de la API.
- `PORT`: puerto de la API.
- `VITE_API_URL`: dirección de la API a la que apunta el proxy.
- `VITE_USE_MOCKS`: si es `true`, el front usa MSW en el navegador en lugar de la API. Por defecto es `false`.

También se pueden levantar por separado con `pnpm dev:backend` y `pnpm dev:frontend`.

## Cómo correr los tests

Se corren desde la raíz del repo.

| Comando | Qué corre |
| --- | --- |
| `pnpm test:unit` | Tests unitarios del backend y, en el front, unitarios, de componentes y de integración con MSW. No necesita la API levantada. |
| `pnpm test:integration` | Integración del backend: repositorios y rutas con SQLite en memoria. |
| `pnpm test:e2e:api` | E2E de la API con Playwright, por HTTP. |
| `pnpm test:e2e:web` | E2E del front con Playwright: recorrido completo con front y API reales. |

Para `test:e2e:api` y `test:e2e:web` los puertos 3000 y 5173 tienen que estar libres, porque Playwright levanta sus propios servidores con la base en memoria. Si es la primera vez, hay que instalar el navegador: `pnpm --filter @cafeteria/frontend exec playwright install chromium`.

## Contrato de la API

Si algo falla, la API responde `{ "error": "mensaje" }` con el código que corresponda. El front muestra ese mensaje tal cual.

### GET /productos y GET /productos/:id

`GET /productos` devuelve una lista y `GET /productos/:id` devuelve un producto. Si el id no existe, responde 404.

Un café:

```json
{
  "id": 5,
  "nombre": "Espresso mediano colombia",
  "tipo": "expreso",
  "tamanio": "mediano",
  "gramosCafe": 27,
  "variedad": {
    "nombre": "Colombia",
    "descripcion": "Acidez media, cuerpo equilibrado y notas cítricas y florales"
  },
  "precio": 7360
}
```

- `tipo`: `expreso` o `filtrado`.
- `tamanio`: `pocillo`, `mediano` o `taza_grande`.
- `variedad.nombre`: `Brasil`, `Colombia` o `Etiopía`.

Una pastelería:

```json
{
  "id": 19,
  "nombre": "Pasteleria muffin chocolate",
  "tipo": "pasteleria",
  "variedad": "muffin_chocolate",
  "precio": 2500
}
```

- `variedad`: `muffin_chocolate` o `torta_selva_negra`.

El `precio` ya viene calculado por la API. El front no calcula precios.

### POST /pedidos

Cuerpo (`mesaId` es opcional):

```json
{
  "mesaId": 4,
  "items": [
    { "productoId": 5, "cantidad": 2 },
    { "productoId": 19, "cantidad": 1 }
  ]
}
```

Responde 201 con el pedido:

```json
{
  "id": 1,
  "mesaId": 4,
  "items": [
    { "productoId": 5, "cantidad": 2 },
    { "productoId": 19, "cantidad": 1 }
  ],
  "estado": "pendiente",
  "total": 17220
}
```

- `estado`: `pendiente`, `entregado` o `cancelado`.
- Responde 400 si el cuerpo es inválido o si algún producto no existe.

### GET /pedidos/:id

Devuelve el pedido con la misma forma que la respuesta de `POST /pedidos`. Si no existe, responde 404.

### Validación en el front

Las respuestas de productos y de pedidos se validan con Zod (`apps/frontend/src/schemas`). Si una respuesta no cumple el contrato, el front muestra un error en lugar de usar los datos.
