import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import CafeSelector from "../../components/CafeSelector";
import type { Producto } from "../../schemas/producto";

describe("CafeSelector con el contrato actual de productos", () => {
  it("muestra el café y el precio devueltos por la API para la selección", async () => {
    const user = userEvent.setup();
    const productos: Producto[] = [
      {
        id: 5,
        tipo: "expreso",
        nombre: "Espresso Mediano Colombia",
        precioBase: 2500,
        tamano: "mediano",
        gramosCafe: 27,
        variedad: {
          nombre: "Colombia",
          descripcion: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
        },
        precio: 7360,
      },
    ];

    render(<CafeSelector productos={productos} onAgregar={() => undefined} />);

    await user.click(screen.getByRole("button", { name: "Expreso" }));
    await user.click(screen.getByRole("button", { name: "Mediano" }));
    await user.click(screen.getByRole("button", { name: "Colombia" }));

    expect(
      screen.getByRole("heading", { name: "Espresso Mediano Colombia" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/7\.360/)).toBeInTheDocument();
  });

  it("muestra el precio y la descripción de un filtrado según el contrato de la API", async () => {
    const user = userEvent.setup();
    const productos: Producto[] = [
      {
        id: 10,
        tipo: "filtrado",
        nombre: "Filtrado Pocillo Brasil",
        precioBase: 3200,
        tamano: "pocillo",
        gramosCafe: 6,
        variedad: {
          nombre: "Brasil",
          descripcion: "Acidez baja, cuerpo denso y notas de avellana",
        },
        precio: 4040,
      },
    ];

    render(<CafeSelector productos={productos} onAgregar={() => undefined} />);

    await user.click(screen.getByRole("button", { name: "Filtrado" }));
    await user.click(screen.getByRole("button", { name: "Pocillo" }));
    await user.click(screen.getByRole("button", { name: "Brasil" }));

    expect(screen.getByRole("heading", { name: "Filtrado Pocillo Brasil" })).toBeInTheDocument();
    expect(screen.getByText("Acidez baja, cuerpo denso y notas de avellana")).toBeInTheDocument();
    expect(screen.getByText(/4\.040/)).toBeInTheDocument();
  });
});
