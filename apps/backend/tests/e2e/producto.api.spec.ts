import { expect, test } from "@playwright/test";

test.describe("API de productos", () => {
  test("GET /productos devuelve el catálogo", async ({ request }) => {
    const respuesta = await request.get("/productos");

    expect(respuesta.status()).toBe(200);
    expect(await respuesta.json()).toHaveLength(20);
  });

  test("GET /productos/:id devuelve el producto existente", async ({ request }) => {
    const respuesta = await request.get("/productos/1");

    expect(respuesta.status()).toBe(200);
    expect((await respuesta.json()).nombre).toBe("Espresso pocillo brasil");
  });

  test("GET /productos/:id devuelve 404 si no existe", async ({ request }) => {
    const respuesta = await request.get("/productos/999");

    expect(respuesta.status()).toBe(404);
    expect(await respuesta.json()).toEqual({ error: "Producto no encontrado" });
  });
});
