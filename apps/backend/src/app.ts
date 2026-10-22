import express from "express";
import { createDb } from "./db/connection";

export function createApp(databasePath?: string) {
  const app = express();

  app.locals.db = createDb(databasePath);
  app.use(express.json());
  app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });

  return app;
}

