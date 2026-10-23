import express from "express";
import { createDb } from "./db/connection";
import { initializeSchema } from "./db/schema";

export function createApp(databasePath?: string) {
  const app = express();

  const db = createDb(databasePath);
  initializeSchema(db);
  app.locals.db = db;
  app.use(express.json());
  app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });

  return app;
}

