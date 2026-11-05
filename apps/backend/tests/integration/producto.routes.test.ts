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
    expect(respuesta.body.tipo).toBe("expreso");
    expect(respuesta.body.precio).toBe(5020);
  });

  it("GET /productos/:id incluye gramos y descripción del origen", async () => {
    const respuesta = await request(app).get("/productos/1");

    expect(respuesta.body.gramosCafe).toBe(18);
    expect(respuesta.body.variedad).toEqual({
      nombre: "Brasil",
      descripcion: "Acidez baja, cuerpo denso y notas de avellana",
    });
  });

  it("GET /productos/:id retorna 404 si el producto no existe", async () => {
    const respuesta = await request(app).get("/productos/999");

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: "Producto no encontrado" });
  });
});
