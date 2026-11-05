import { Router } from "express";
import { ProductoController } from "../controllers/producto.controller";

export function crearProductoRouter(controller: ProductoController) {
  const router = Router();

  router.get("/", controller.obtenerTodos);
  router.get("/:id", controller.obtenerPorId);

  return router;
}
