export interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  fechaFin?: string;
  hora?: string;
  descripcion: string;
  tipo: 'liturgico' | 'pastoral' | 'social' | 'patronal' | 'formacion';
  destacado?: boolean;
}

export const eventos: Evento[] = [
  {
    id: '1',
    titulo: 'Pentecostés',
    fecha: '2026-05-24',
    hora: '10:00 y 20:00 hs.',
    descripcion: 'Misa solemne de Pentecostés. Invitamos a toda la comunidad a renovar los dones del Espíritu Santo.',
    tipo: 'liturgico',
    destacado: true,
  },
  {
    id: '2',
    titulo: 'Domingo de la Santísima Trinidad',
    fecha: '2026-05-31',
    hora: '10:00 y 20:00 hs.',
    descripcion: 'Celebración de la Solemnidad de la Santísima Trinidad. Misa solemne con toda la comunidad.',
    tipo: 'liturgico',
  },
  {
    id: '3',
    titulo: 'Corpus Christi',
    fecha: '2026-06-04',
    hora: '19:00 hs.',
    descripcion: 'Misa solemne y procesión por las calles del barrio. Pedimos a los feligreses que adornen el frente de sus casas.',
    tipo: 'liturgico',
    destacado: true,
  },
  {
    id: '4',
    titulo: 'Retiro de Confirmación',
    fecha: '2026-06-13',
    descripcion: 'Retiro espiritual para los jóvenes que se preparan para recibir el Sacramento de la Confirmación. Inscripción previa en la secretaría parroquial.',
    tipo: 'formacion',
  },
  {
    id: '5',
    titulo: 'Sagrado Corazón de Jesús',
    fecha: '2026-06-19',
    hora: '19:00 hs.',
    descripcion: 'Solemnidad del Sagrado Corazón de Jesús. Misa solemne y consagración de las familias.',
    tipo: 'liturgico',
  },
  {
    id: '6',
    titulo: 'Novena a Nuestra Señora del Carmen',
    fecha: '2026-07-07',
    fechaFin: '2026-07-15',
    hora: '19:00 hs. cada día',
    descripcion: 'Nueve días de oración y preparación espiritual para la gran fiesta de nuestra Patrona. Todos los días a las 19:00 hs.',
    tipo: 'patronal',
    destacado: true,
  },
  {
    id: '7',
    titulo: '🎉 Fiesta de Nuestra Señora del Carmen',
    fecha: '2026-07-16',
    hora: '11:00 hs.',
    descripcion: 'FIESTA PATRONAL de nuestra Parroquia. Misa solemne a las 11:00 hs., procesión por el barrio y festejo comunitario. ¡Los esperamos a todos!',
    tipo: 'patronal',
    destacado: true,
  },
  {
    id: '8',
    titulo: 'Misa de Quinceañeras',
    fecha: '2026-07-25',
    hora: '18:00 hs.',
    descripcion: 'Misa mensual en honor de las jóvenes que cumplen 15 años. Inscripción en la secretaría parroquial.',
    tipo: 'pastoral',
  },
  {
    id: '9',
    titulo: 'Asunción de la Virgen María',
    fecha: '2026-08-15',
    hora: '8:00, 10:00 y 20:00 hs.',
    descripcion: 'Solemnidad de la Asunción de la Santísima Virgen María al Cielo. Misa solemne con toda la comunidad.',
    tipo: 'liturgico',
    destacado: true,
  },
];
