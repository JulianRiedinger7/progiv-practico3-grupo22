import Database from 'better-sqlite3';
import { afterEach, describe, expect, it } from 'vitest';
import { initializeSchema } from '../../src/db/schema';

describe('initializeSchema', () => {
  let db: Database.Database;

  afterEach(() => {
    db.close();
  });

  it('agrega la columna mesa_id a una tabla pedidos existente sin ella', () => {
    db = new Database(':memory:');
    db.exec(`
      CREATE TABLE pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        estado TEXT NOT NULL DEFAULT 'pendiente'
      );
    `);

    initializeSchema(db);

    const columnas = db.prepare('PRAGMA table_info(pedidos)').all() as { name: string }[];

    expect(columnas.map((columna) => columna.name)).toContain('mesa_id');
  });

  it('es idempotente cuando la columna mesa_id ya existe', () => {
    db = new Database(':memory:');

    initializeSchema(db);
    initializeSchema(db);

    const columnas = db.prepare('PRAGMA table_info(pedidos)').all() as { name: string }[];

    expect(columnas.filter((columna) => columna.name === 'mesa_id')).toHaveLength(1);
  });
});
