export const MESES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export const DIAS_ES = [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado',
];

export const formatearFecha = (fecha: Date): string =>
  `${DIAS_ES[fecha.getDay()]}, ${fecha.getDate()} de ${MESES_ES[fecha.getMonth()]} de ${fecha.getFullYear()}`;

export const hoyMedianoche = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
