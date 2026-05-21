export interface MasaHorario {
  dia: string;
  horarios: string[];
  nota?: string;
}

export const horariosOrdinarios: MasaHorario[] = [
  { dia: 'Lunes',     horarios: ['18:30'] },
  { dia: 'Martes',    horarios: ['12:30'] },
  { dia: 'Miércoles', horarios: ['18:30'] },
  { dia: 'Jueves',    horarios: ['12:30'] },
  { dia: 'Viernes',   horarios: ['18:30'] },
  { dia: 'Sábado',    horarios: ['12:30', '18:00'], nota: 'Misa de las 18:00 con niños' },
  { dia: 'Domingo',   horarios: ['11:30', '19:30'] },
];

export const horariosEspeciales: MasaHorario[] = [];

export const contacto = {
  nombre: 'Parroquia del Carmen (Centro)',
  direccion: 'Rodríguez Peña 840, C1060 CABA',
  instagram: '@parroquiadelcarmenc',
  horarioSecretaria: 'Mar. y Jue.: 10:00 a 13:00\nLun., Mié. y Vie.: 17:00 a 20:00',
};
