import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("menú de Cafetería Origen", () => {
  it("muestra el nombre de la cafetería al abrirse", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Cafetería Origen" }),
    ).toBeInTheDocument();
  });
});
