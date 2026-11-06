export function leerMesaDesdeUrl(search: string): number | null {
  const mesa = new URLSearchParams(search).get('mesa');

  if (mesa === null || mesa.trim() === '') return null;

  const numeroDeMesa = Number(mesa);

  return Number.isInteger(numeroDeMesa) && numeroDeMesa > 0 ? numeroDeMesa : null;
}
