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

export const eventos: Evento[] = [];
