import { type Express } from "express";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../src/app";

describe("Rutas de productos", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp(":memory:");
  });

  afterEach(() => {
    app.locals.db.close();
  });

  it("GET /productos retorna el catálogo", async () => {
    const respuesta = await request(app).get("/productos");

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(20);
  });

  it("GET /productos/:id retorna el producto existente", async () => {
    const respuesta = await request(app).get("/productos/1");

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.nombre).toBe("Espresso pocillo brasil");
  });
});
