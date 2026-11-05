import { CafeEspresso } from "../models/CafeEspresso";
import { CafeFiltrado } from "../models/CafeFiltrado";
import { Pasteleria } from "../models/Pasteleria";
import type { Producto } from "../models/Producto";

export const catalogo: Producto[] = [
  ...(["pocillo", "mediano", "taza_grande"] as const).flatMap(
    (tamano, indexTamano) =>
      (["brasil", "colombia", "etiopia"] as const).map(
        (variedad, indexVariedad) =>
          new CafeEspresso(
            indexTamano * 3 + indexVariedad + 1,
            tamano,
            variedad,
          ),
      ),
  ),
  ...(["pocillo", "mediano", "taza_grande"] as const).flatMap(
    (tamano, indexTamano) =>
      (["brasil", "colombia", "etiopia"] as const).map(
        (variedad, indexVariedad) =>
          new CafeFiltrado(
            10 + indexTamano * 3 + indexVariedad,
            tamano,
            variedad,
          ),
      ),
  ),
  new Pasteleria(19, "muffin_chocolate"),
  new Pasteleria(20, "torta_selva_negra"),
];
