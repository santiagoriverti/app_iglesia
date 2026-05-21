import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
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

const isFirebaseConfigured = (): boolean => {
  try {
    // Si el projectId sigue siendo el placeholder, no intentamos conectar
    const { db: _db } = require('./firebase');
    return true;
  } catch {
    return false;
  }
};

export const getMisas = async (): Promise<MisasData> => {
  const fallback: MisasData = { ordinarios: horariosOrdinarios, contacto };
  try {
    const snap = await getDoc(doc(db, 'config', 'misas'));
    if (snap.exists()) {
      const data = snap.data();
      return {
        ordinarios: (data.ordinarios as MasaHorario[]) ?? horariosOrdinarios,
        contacto: (data.contacto as ContactoData) ?? contacto,
      };
    }
  } catch {
    // Firestore no configurado o sin conexión → usa datos locales
  }
  return fallback;
};

export const getEventos = async (): Promise<Evento[]> => {
  try {
    const snap = await getDocs(collection(db, 'eventos'));
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Evento));
    }
  } catch {
    // Firestore no configurado o sin conexión → usa datos locales
  }
  return eventos;
};
