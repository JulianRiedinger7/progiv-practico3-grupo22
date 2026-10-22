import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export function createDb(
  path =
    process.env.SQLITE_DATABASE_PATH ??
    (process.env.NODE_ENV === "test" ? ":memory:" : "./data/cafeteria.sqlite"),
): Database.Database {
  const databasePath = path === ":memory:" ? path : resolve(path);

  if (databasePath !== ":memory:") {
    mkdirSync(dirname(databasePath), { recursive: true });
  }

  const db = new Database(databasePath);
  db.pragma("foreign_keys = ON");

  return db;
}
