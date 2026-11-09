import { describe, expect, it } from 'vitest';
import { formatearPrecio } from '../../utils/precio';

describe('formatearPrecio', () => {
  it('formatea un monto entero en pesos argentinos con separador de miles', () => {
    expect(formatearPrecio(7360)).toMatch(/\$\s?7\.360/);
  });

  it('formatea cero pesos correctamente', () => {
    expect(formatearPrecio(0)).toMatch(/\$\s?0/);
  });
});
