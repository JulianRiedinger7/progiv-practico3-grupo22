import { describe, expect, it } from 'vitest';
import { leerMesaDesdeUrl } from '../../utils/mesa';

describe('leerMesaDesdeUrl', () => {
  it('obtiene el número de mesa indicado en el parámetro mesa', () => {
    expect(leerMesaDesdeUrl('?mesa=4')).toBe(4);
  });
});
