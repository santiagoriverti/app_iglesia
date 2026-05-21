import { FIRESTORE_BASE } from './firebase';
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

// Parse Firestore REST API typed field value to plain JS
const parseValue = (val: any): any => {
  if (!val) return null;
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return val.doubleValue;
  if ('booleanValue' in val) return val.booleanValue;
  if ('arrayValue' in val) return (val.arrayValue?.values ?? []).map(parseValue);
  if ('mapValue' in val) return parseFields(val.mapValue?.fields ?? {});
  return null;
};

const parseFields = (fields: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(fields)) {
    result[key] = parseValue(value);
  }
  return result;
};

export const getMisas = async (signal?: AbortSignal): Promise<MisasData> => {
  const fallback: MisasData = { ordinarios: horariosOrdinarios, contacto };
  try {
    const res = await fetch(`${FIRESTORE_BASE}/config/misas`, { signal });
    if (!res.ok) return fallback;
    const json = await res.json();
    const data = parseFields(json.fields ?? {});
    return {
      ordinarios: (data.ordinarios as MasaHorario[]) ?? horariosOrdinarios,
      contacto: (data.contacto as ContactoData) ?? contacto,
    };
  } catch {
    return fallback;
  }
};

export const getEventos = async (signal?: AbortSignal): Promise<Evento[]> => {
  try {
    const res = await fetch(`${FIRESTORE_BASE}/eventos`, { signal });
    if (!res.ok) return eventos;
    const json = await res.json();
    if (!json.documents) return eventos;
    return json.documents.map((doc: any) => ({
      id: doc.name.split('/').pop(),
      ...parseFields(doc.fields ?? {}),
    })) as Evento[];
  } catch {
    return eventos;
  }
};
