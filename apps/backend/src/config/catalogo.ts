import { CafeEspresso } from "../models/CafeEspresso";
import { CafeFiltrado } from "../models/CafeFiltrado";
import { Pasteleria } from "../models/Pasteleria";
import type { Producto } from "../models/Producto";

export const catalogo: Producto[] = [
  new CafeEspresso(1, "pocillo", "brasil"),
  new CafeFiltrado(2, "pocillo", "brasil"),
  new Pasteleria(3, "muffin_chocolate"),
  new Pasteleria(4, "torta_selva_negra"),
];
