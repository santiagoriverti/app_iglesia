import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getDb } from './firebase';
import { horariosOrdinarios, contacto, MasaHorario } from '../data/misas';
import { eventos, Evento } from '../data/eventos';

export interface ContactoData {
  nombre: string;
  direccion: string;
  instagram: string;
  horarioSecretaria: string;
}

export interface MisasData {
  ordinarios: MasaHorario[];
  contacto: ContactoData;
}

export const getMisas = async (): Promise<MisasData> => {
  const fallback: MisasData = { ordinarios: horariosOrdinarios, contacto };
  try {
    const db = getDb();
    if (!db) return fallback;
    const snap = await getDoc(doc(db, 'config', 'misas'));
    if (snap.exists()) {
      const data = snap.data();
      return {
        ordinarios: (data.ordinarios as MasaHorario[]) ?? horariosOrdinarios,
        contacto: (data.contacto as ContactoData) ?? contacto,
      };
    }
  } catch {
    // sin conexión o Firestore no disponible → usa datos locales
  }
  return fallback;
};

export const getEventos = async (): Promise<Evento[]> => {
  try {
    const db = getDb();
    if (!db) return eventos;
    const snap = await getDocs(collection(db, 'eventos'));
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Evento));
    }
  } catch {
    // sin conexión o Firestore no disponible → usa datos locales
  }
  return eventos;
};
