export interface Lectura {
  titulo: string;
  referencia: string;
  texto: string;
}

export interface LecturasDiarias {
  diaLiturgico: string;
  colorLiturgico: 'rojo' | 'verde' | 'blanco' | 'morado' | 'dorado';
  primeraLectura: Lectura;
  evangelio: Lectura;
}

// Simplified lectionary for May–August 2026 (Year B/C)
interface EntradaLeccionario {
  diaLiturgico: string;
  colorLiturgico: 'rojo' | 'verde' | 'blanco' | 'morado' | 'dorado';
  primeraRef: string;
  primeraApiRef: string;
  evangelioTitulo: string;
  evangelioRef: string;
  evangelioApiRef: string;
}

const leccionario2026: Record<string, EntradaLeccionario> = {
  '2026-05-21': {
    diaLiturgico: 'Jueves – VII Semana del Tiempo Pascual',
    colorLiturgico: 'blanco',
    primeraRef: 'Hch 22:30; 23:6-11',
    primeraApiRef: 'acts+22:30',
    evangelioTitulo: 'Evangelio según San Juan',
    evangelioRef: 'Jn 17:20-26',
    evangelioApiRef: 'john+17:20-26',
  },
  '2026-05-22': {
    diaLiturgico: 'Viernes – VII Semana del Tiempo Pascual',
    colorLiturgico: 'blanco',
    primeraRef: 'Hch 25:13b-21',
    primeraApiRef: 'acts+25:13',
    evangelioTitulo: 'Evangelio según San Juan',
    evangelioRef: 'Jn 21:15-19',
    evangelioApiRef: 'john+21:15-19',
  },
  '2026-05-23': {
    diaLiturgico: 'Sábado – VII Semana del Tiempo Pascual',
    colorLiturgico: 'blanco',
    primeraRef: 'Hch 28:16-20,30-31',
    primeraApiRef: 'acts+28:16-20',
    evangelioTitulo: 'Evangelio según San Juan',
    evangelioRef: 'Jn 21:20-25',
    evangelioApiRef: 'john+21:20-25',
  },
  '2026-05-24': {
    diaLiturgico: 'Pentecostés – Misa del Día',
    colorLiturgico: 'rojo',
    primeraRef: 'Hch 2:1-11',
    primeraApiRef: 'acts+2:1-11',
    evangelioTitulo: 'Evangelio según San Juan',
    evangelioRef: 'Jn 20:19-23',
    evangelioApiRef: 'john+20:19-23',
  },
  '2026-05-31': {
    diaLiturgico: 'Solemnidad de la Santísima Trinidad',
    colorLiturgico: 'blanco',
    primeraRef: 'Prov 8:22-31',
    primeraApiRef: 'proverbs+8:22-31',
    evangelioTitulo: 'Evangelio según San Juan',
    evangelioRef: 'Jn 16:12-15',
    evangelioApiRef: 'john+16:12-15',
  },
  '2026-06-04': {
    diaLiturgico: 'Solemnidad del Santísimo Cuerpo y Sangre de Cristo',
    colorLiturgico: 'blanco',
    primeraRef: 'Gn 14:18-20',
    primeraApiRef: 'genesis+14:18-20',
    evangelioTitulo: 'Evangelio según San Lucas',
    evangelioRef: 'Lc 9:11b-17',
    evangelioApiRef: 'luke+9:11-17',
  },
  '2026-07-16': {
    diaLiturgico: 'Memoria de Nuestra Señora del Monte Carmelo',
    colorLiturgico: 'blanco',
    primeraRef: 'Miq 5:1-4a',
    primeraApiRef: 'micah+5:1-4',
    evangelioTitulo: 'Evangelio según San Mateo',
    evangelioRef: 'Mt 12:46-50',
    evangelioApiRef: 'matthew+12:46-50',
  },
};

const _cache: Record<string, LecturasDiarias> = {};

const fallbackLectura: LecturasDiarias = {
  diaLiturgico: 'Tiempo Ordinario',
  colorLiturgico: 'verde',
  primeraLectura: {
    titulo: 'Primera Lectura',
    referencia: '',
    texto: 'No se pudo cargar la lectura del día. Por favor, verifica tu conexión a internet e intenta nuevamente.',
  },
  evangelio: {
    titulo: 'Evangelio del Día',
    referencia: 'Jn 15:9-12',
    texto:
      '"Como el Padre me amó, yo también os he amado; permaneced en mi amor. Si guardáis mis mandamientos, permaneceréis en mi amor, como yo he guardado los mandamientos de mi Padre y permanezco en su amor. Os he hablado de esto para que mi alegría esté en vosotros, y vuestra alegría llegue a su plenitud. Éste es mi mandamiento: que os améis los unos a los otros como yo os he amado."',
  },
};

// Uses local date parts (not toISOString) to avoid UTC offset shifting the day in Argentina (UTC-3)
const getDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const fetchTexto = async (apiRef: string, signal?: AbortSignal): Promise<string> => {
  const url = `https://bible-api.com/${encodeURIComponent(apiRef)}?translation=rvr1960`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return (data.text as string).trim();
};

export const fetchLecturasHoy = async (signal?: AbortSignal): Promise<LecturasDiarias> => {
  const hoy = new Date();
  const clave = getDateKey(hoy);
  if (_cache[clave]) return _cache[clave];

  const entrada = leccionario2026[clave];

  if (!entrada) {
    const claves = Object.keys(leccionario2026);
    const claveMasCercana = claves.reduce((prev, curr) => {
      const diffPrev = Math.abs(new Date(prev).getTime() - hoy.getTime());
      const diffCurr = Math.abs(new Date(curr).getTime() - hoy.getTime());
      return diffCurr < diffPrev ? curr : prev;
    });
    const entradaCercana = leccionario2026[claveMasCercana];
    if (!entradaCercana) return fallbackLectura;

    try {
      const evangelioTexto = await fetchTexto(entradaCercana.evangelioApiRef, signal);
      const result: LecturasDiarias = {
        diaLiturgico: entradaCercana.diaLiturgico,
        colorLiturgico: entradaCercana.colorLiturgico,
        primeraLectura: {
          titulo: 'Primera Lectura',
          referencia: entradaCercana.primeraRef,
          texto: 'Consulte el misal para la lectura completa.',
        },
        evangelio: {
          titulo: entradaCercana.evangelioTitulo,
          referencia: entradaCercana.evangelioRef,
          texto: evangelioTexto,
        },
      };
      _cache[clave] = result;
      return result;
    } catch {
      return fallbackLectura;
    }
  }

  try {
    const [evangelioTexto, primeraTexto] = await Promise.allSettled([
      fetchTexto(entrada.evangelioApiRef, signal),
      fetchTexto(entrada.primeraApiRef, signal),
    ]);

    const result: LecturasDiarias = {
      diaLiturgico: entrada.diaLiturgico,
      colorLiturgico: entrada.colorLiturgico,
      primeraLectura: {
        titulo: 'Primera Lectura',
        referencia: entrada.primeraRef,
        texto: primeraTexto.status === 'fulfilled'
          ? primeraTexto.value
          : 'Consulte el misal para la lectura completa.',
      },
      evangelio: {
        titulo: entrada.evangelioTitulo,
        referencia: entrada.evangelioRef,
        texto: evangelioTexto.status === 'fulfilled'
          ? evangelioTexto.value
          : fallbackLectura.evangelio.texto,
      },
    };
    _cache[clave] = result;
    return result;
  } catch {
    return fallbackLectura;
  }
};
