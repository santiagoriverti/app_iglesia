export interface MasaHorario {
  dia: string;
  horarios: string[];
  nota?: string;
}

export interface Confesiones {
  dias: string;
  horario: string;
}

export const horariosOrdinarios: MasaHorario[] = [
  { dia: 'Lunes', horarios: ['8:00', '19:00'] },
  { dia: 'Martes', horarios: ['8:00', '19:00'] },
  { dia: 'Miércoles', horarios: ['8:00', '19:00'] },
  { dia: 'Jueves', horarios: ['8:00', '19:00'] },
  { dia: 'Viernes', horarios: ['8:00', '19:00'] },
  { dia: 'Sábado', horarios: ['9:00', '20:00'] },
  { dia: 'Domingo', horarios: ['8:00', '10:00', '12:00', '20:00'] },
];

export const horariosEspeciales: MasaHorario[] = [
  { dia: 'Primeros Viernes', horarios: ['8:00', '19:00'], nota: 'Adoración eucarística de 18:00 a 19:00 hs.' },
  { dia: 'Fiestas de guardar', horarios: ['8:00', '10:00', '20:00'] },
];

export const confesiones: Confesiones[] = [
  { dias: 'Lunes a Viernes', horario: '18:00 a 19:00 hs.' },
  { dias: 'Sábados', horario: '10:00 a 11:00 y 19:00 a 20:00 hs.' },
  { dias: 'Domingos', horario: '9:30 a 10:00 y 11:30 a 12:00 hs.' },
];

export const contacto = {
  direccion: 'Dirección de la Parroquia - Centro',
  telefono: '(011) XXXX-XXXX',
  email: 'parroquia@nsdcarmen.org.ar',
  horarioSecretaria: 'Lunes a Viernes de 9:00 a 13:00 hs.',
};
