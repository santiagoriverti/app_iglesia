import { useEffect, useState } from 'react';
import { Evento } from '../data/eventos';
import { getEventos } from '../services/firestoreService';

export function useEventos(): Evento[] {
  const [lista, setLista] = useState<Evento[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    getEventos(controller.signal).then(setLista);
    return () => controller.abort();
  }, []);
  return lista;
}
