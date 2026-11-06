# Proyecto Cafetería

Monorepositorio pnpm con una API Express y una aplicación React. El backend usa SQLite mediante `better-sqlite3`, sin ORM. Las aplicaciones arrancan con lo mínimo; los casos de uso, modelos de dominio, repositorios y sus pruebas se incorporan por funcionalidad siguiendo TDD.

## Requisitos

- Node.js 22.13 o superior y pnpm 12.15.0.
- Docker Desktop con Docker Compose (opcional para desarrollo local; requerido para los comandos Docker).

## Arranque local

```sh
pnpm install
Copy-Item .env.example .env # PowerShell; en bash: cp .env.example .env
pnpm dev
```

La API queda en `http://localhost:3000/health` y Vite en `http://localhost:5173`. Al crear la app, `new Database(path)` crea automáticamente el archivo indicado por `SQLITE_DATABASE_PATH` (por defecto `apps/backend/data/cafeteria.sqlite`); no hay que iniciar un servidor de base de datos.

## Arranque con Docker

```sh
pnpm docker:up
```

Compose levanta el backend y el frontend en contenedores separados, usando Vite para servir el frontend y `tsx` para ejecutar el backend en desarrollo. Los puertos publicados son `http://localhost:5173` para el frontend y `http://localhost:3000` para la API.

El archivo de SQLite se guarda en el volumen `sqlite_data`, para que los datos sobrevivan al reemplazo o detención de los contenedores.

Para detener los servicios: `pnpm docker:down`. Esto conserva el volumen y los datos. `docker compose down -v` también borra los volúmenes y, por lo tanto, los datos de SQLite.

## Base de datos

`SQLITE_DATABASE_PATH` indica la ruta del archivo de base de datos. `createApp()` permite pasar una ruta explícita y en modo test usa `:memory:` para no tocar los datos locales. Para desarrollo, el archivo está en `apps/backend/data/cafeteria.sqlite`, ruta ignorada por Git.

No hay modelos ni esquema de negocio al inicio. `new Database(path)` crea/abre el archivo; `db.exec(...)` ejecutará el SQL que crea las tablas cuando agreguemos la primera funcionalidad persistida, siguiendo el patrón del TP2. Al implementar cada funcionalidad, escriban las consultas SQL dentro de sus repositorios y mantengan allí el mapeo de filas a objetos para que los servicios dependan de contratos y no del driver.

## Pruebas y TDD

- `pnpm test:unit`: Vitest en backend y frontend. Las pruebas unitarias del servicio pueden usar repositorios falsos.
- `pnpm test:integration`: Vitest para repositorios y rutas con SQLite real en memoria; Supertest sirve para probar la app Express.
- `pnpm test:e2e:api`: Playwright Test contra el backend por HTTP.
- `pnpm test:e2e:web`: Playwright Test en Chromium; levanta el frontend y el backend de prueba.

Para cada funcionalidad, escriban primero el test del comportamiento que quieren implementar. Un test unitario del servicio puede inyectar un mock; la persistencia del repositorio se verifica con SQLite real; Playwright queda para unos pocos flujos completos. No se crea una implementación genérica de repositorios por adelantado.

Las suites todavía no contienen casos de producto: agreguen pruebas a `apps/backend/tests/unit`, `apps/backend/tests/integration`, `apps/backend/tests/e2e` y `apps/frontend/src` / `apps/frontend/e2e` al comenzar cada funcionalidad.
