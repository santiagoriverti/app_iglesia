export interface Santo {
  nombre: string;
  fiesta: string;
  biografia: string;
  patrono?: string;
}

const santos: Record<string, Santo> = {
  '05-21': {
    nombre: 'San Eugenio de Mazenod',
    fiesta: '21 de mayo',
    biografia: 'Eugenio de Mazenod nació en Aix-en-Provence, Francia, en 1782. Fundó la Congregación de los Misioneros Oblatos de María Inmaculada para evangelizar a los pobres y abandonados. Fue un gran pastor y evangelizador, nombrado Obispo de Marsella, donde trabajó incansablemente por los más necesitados hasta su muerte en 1861.',
    patrono: 'Oblatos de María Inmaculada',
  },
  '05-22': {
    nombre: 'Santa Rita de Casia',
    fiesta: '22 de mayo',
    biografia: 'Santa Rita nació en Umbría, Italia, hacia 1381. Casada con un hombre violento que luego fue asesinado, sufrió también la pérdida de sus dos hijos. Ingresó al convento agustino de Casia, donde vivió con gran penitencia y amor. Le fue concedido el don de participar en los dolores de la Pasión de Cristo, apareciendo una espina de la corona en su frente. Es conocida como la patrona de los casos imposibles.',
    patrono: 'Causas imposibles y desesperadas',
  },
  '05-24': {
    nombre: 'María Auxiliadora',
    fiesta: '24 de mayo',
    biografia: 'La devoción a María Auxiliadora fue impulsada por San Juan Bosco, quien la consideró protectora de los jóvenes y de la Iglesia. La advocación nació en el siglo XVI y fue proclamada fiesta universal por Pío VII como acción de gracias tras su liberación de Napoleón. Don Bosco construyó en Turín la Basílica de María Auxiliadora, que se convirtió en centro de peregrinación mundial.',
    patrono: 'Jóvenes, familia salesiana',
  },
  '05-25': {
    nombre: 'San Beda el Venerable',
    fiesta: '25 de mayo',
    biografia: 'Beda nació en Northumbria, Inglaterra, hacia el año 673. Monje benedictino y Doctor de la Iglesia, es considerado el padre de la historia inglesa por su obra "Historia Eclesiástica del Pueblo Inglés". Hombre de profunda fe y gran erudición, dedicó su vida entera a la oración, al estudio y a la enseñanza en el monasterio de Jarrow.',
    patrono: 'Estudiosos e historiadores',
  },
  '05-26': {
    nombre: 'San Felipe Neri',
    fiesta: '26 de mayo',
    biografia: 'Felipe Neri nació en Florencia en 1515. Conocido como el "Apóstol de Roma", fundó el Oratorio, una congregación dedicada a la oración comunitaria y la formación espiritual. Su alegría, humor y espiritualidad profunda atrajeron a miles de personas hacia Dios. Fue canonizado en 1622 junto con Ignacio de Loyola y Teresa de Ávila.',
    patrono: 'Roma, sacerdotes, alegría espiritual',
  },
  '05-29': {
    nombre: 'Santa Magdalena Sofía Barat',
    fiesta: '29 de mayo',
    biografia: 'Magdalena Sofía Barat nació en Borgoña, Francia, en 1779. Fundó la Sociedad del Sagrado Corazón de Jesús, dedicada a la educación de la juventud femenina. A lo largo de su vida abrió más de 100 colegios en Europa y América. Murió en París en 1865 y fue canonizada en 1925.',
    patrono: 'Educadoras, mujeres jóvenes',
  },
  '05-31': {
    nombre: 'Visitación de la Virgen María',
    fiesta: '31 de mayo',
    biografia: 'La fiesta de la Visitación conmemora la visita de la Virgen María a su prima Isabel, narrada en el Evangelio de San Lucas. María, recién concebido Jesús en su seno, fue a servir a su anciana prima que esperaba a Juan el Bautista. Al saludarse, Juan saltó de alegría en el vientre de Isabel, quien exclamó: "¿De dónde a mí que la madre de mi Señor venga a visitarme?"',
    patrono: 'Madres embarazadas, amistad cristiana',
  },
  '06-03': {
    nombre: 'San Carlos Lwanga y compañeros',
    fiesta: '3 de junio',
    biografia: 'Carlos Lwanga y sus 21 compañeros fueron martirizados en Uganda entre 1885 y 1887 por orden del rey Mwanga, quien los acusó de practicar el cristianismo. Jóvenes de entre 13 y 30 años, murieron quemados vivos por no renunciar a su fe. Son los protomártires del África subsahariana.',
    patrono: 'Jóvenes africanos, víctimas de persecución',
  },
  '06-13': {
    nombre: 'San Antonio de Padua',
    fiesta: '13 de junio',
    biografia: 'Antonio nació en Lisboa, Portugal, en 1195. Franciscano y Doctor de la Iglesia, fue un predicador extraordinario que convertía a multitudes con su elocuencia y santidad. Amigo personal de San Francisco de Asís, trabajó en Italia y Francia. Murió en Padua en 1231 a los 36 años y fue canonizado al año siguiente. Es conocido como el "santo de los milagros" y el patrono de los objetos perdidos.',
    patrono: 'Objetos perdidos, pobres, matrimonios',
  },
  '06-24': {
    nombre: 'Natividad de San Juan Bautista',
    fiesta: '24 de junio',
    biografia: 'Esta solemnidad celebra el nacimiento de Juan el Bautista, el precursor de Jesucristo. Hijo de Zacarías e Isabel, pariente de la Virgen María, nació seis meses antes que Jesús. Fue el último profeta del Antiguo Testamento y bautizó a Jesús en el Jordán. Su nacimiento fue anunciado por el ángel Gabriel y acompañado por milagros.',
    patrono: 'Argentina (junto con San Pedro), varios países',
  },
  '06-29': {
    nombre: 'San Pedro y San Pablo Apóstoles',
    fiesta: '29 de junio',
    biografia: 'La Solemnidad de los Santos Pedro y Pablo celebra a los dos grandes pilares de la Iglesia. Pedro, el pescador galileo elegido por Jesús como primera piedra de su Iglesia, murió crucificado en Roma. Pablo, el fariseo que perseguía a los cristianos y se convirtió en el más ardiente apóstol de las naciones, fue decapitado en Roma. Ambos dieron su vida por Cristo.',
    patrono: 'La Iglesia universal, Roma, Argentina',
  },
  '07-03': {
    nombre: 'Santo Tomás Apóstol',
    fiesta: '3 de julio',
    biografia: 'Tomás, uno de los doce apóstoles, es conocido por su incredulidad ante la Resurrección de Jesús: "Si no veo en sus manos la señal de los clavos..." Cuando Jesús se le apareció y le mostró sus llagas, exclamó: "¡Señor mío y Dios mío!" Predicó el Evangelio en Partia, Persia y la India, donde fue martirizado. Su tumba en Mylapore (India) es lugar de peregrinación.',
    patrono: 'India, arquitectos, personas que dudan',
  },
  '07-06': {
    nombre: 'Santa María Goretti',
    fiesta: '6 de julio',
    biografia: 'María nació en 1890 en Italia en una familia muy pobre. A los 11 años fue atacada por un joven vecino llamado Alessandro Serenelli que intentó violarla. Ella se resistió invocando a Dios y fue apuñalada, muriendo al día siguiente perdonando a su agresor. Alessandro se convirtió y llegó a ser testigo de su canonización en 1950. Es un símbolo de pureza y perdón cristiano.',
    patrono: 'Juventud, víctimas de violencia, castidad',
  },
  '07-11': {
    nombre: 'San Benito de Nursia',
    fiesta: '11 de julio',
    biografia: 'Benito nació en Nursia, Italia, hacia el año 480. Fundó el monasterio de Monte Cassino y escribió su famosa Regla que guiaría el monacato occidental durante siglos: "Ora et Labora" (Reza y trabaja). Padre del monaquismo occidental y Patrono de Europa, sus monasterios preservaron la cultura y la fe durante los siglos oscuros.',
    patrono: 'Europa, monjes, contra las tentaciones',
  },
  '07-15': {
    nombre: 'San Buenaventura',
    fiesta: '15 de julio',
    biografia: 'Juan de Fidanza, llamado Buenaventura, nació en Bagnoregio, Italia, en 1221. Franciscano y Doctor de la Iglesia, fue discípulo de San Alejandro de Hales y maestro en París. Elegido ministro general de la Orden Franciscana, la reformó y unificó. Escribió la Vida de San Francisco y obras de mística de gran profundidad. Murió en 1274 durante el Concilio de Lyon.',
    patrono: 'Ministros franciscanos, teólogos',
  },
  '07-16': {
    nombre: 'Nuestra Señora del Monte Carmelo',
    fiesta: '16 de julio',
    biografia: 'Nuestra Señora del Carmen es la Patrona de la Orden del Carmen, fundada en el Monte Carmelo (Israel) en el siglo XII. La tradición cuenta que la Virgen María se apareció a San Simón Stock en 1251 entregándole el escapulario carmelita con la promesa de su protección espiritual. Esta advocación mariana es especialmente querida en América Latina y España.',
    patrono: 'Orden Carmelita, Chile, Bolivia, marineros',
  },
  '07-22': {
    nombre: 'Santa María Magdalena',
    fiesta: '22 de julio',
    biografia: 'María Magdalena fue una de las discípulas más cercanas a Jesús, quien la libró de siete demonios. Estuvo presente en la Crucifixión y fue la primera en ver al Resucitado la mañana de Pascua. Jesús la envió a anunciar la Resurrección a los apóstoles, por lo que es llamada "Apóstola de los Apóstoles". Es modelo de conversión, amor y fidelidad a Cristo.',
    patrono: 'Pecadores convertidos, mujeres, contemplativas',
  },
  '07-25': {
    nombre: 'Santiago Apóstol',
    fiesta: '25 de julio',
    biografia: 'Jacobo, llamado Santiago, fue uno de los doce apóstoles, hijo de Zebedeo y hermano de Juan. Fue uno de los tres testigos privilegiados de la Transfiguración y de la agonía en Getsemaní. Fue el primero de los apóstoles en morir mártir, decapitado por orden de Herodes Agripa hacia el año 44. La tradición lo vincula con España, siendo Santiago de Compostela uno de los grandes centros de peregrinación cristiana.',
    patrono: 'España, peregrinos, caballeros',
  },
  '07-26': {
    nombre: 'San Joaquín y Santa Ana',
    fiesta: '26 de julio',
    biografia: 'Joaquín y Ana son los padres de la Virgen María y abuelos de Jesucristo, según la tradición de los primeros siglos. Vivieron su fe con fidelidad y paciencia, esperando un hijo en la vejez. Fueron elegidos por Dios para traer al mundo a la que sería la Madre del Salvador. Son modelo de familias que educan a sus hijos en la fe.',
    patrono: 'Abuelos, padres de familia, matrimonios',
  },
  '07-29': {
    nombre: 'Santa Marta, María y Lázaro',
    fiesta: '29 de julio',
    biografia: 'Marta, María y su hermano Lázaro eran tres hermanos de Betania, amigos entrañables de Jesús. En su casa Jesús se hospedaba cuando visitaba Jerusalén. María ungió los pies de Jesús con perfume precioso; Marta protestó por la falta de ayuda de su hermana. Jesús resucitó a Lázaro, uno de los milagros más grandes de su ministerio. Son modelo de amistad con Cristo.',
    patrono: 'Hosteleros, cocineras, sirvientes',
  },
  '07-31': {
    nombre: 'San Ignacio de Loyola',
    fiesta: '31 de julio',
    biografia: 'Ignacio nació en el castillo de Loyola, España, en 1491. Soldado herido en la batalla de Pamplona, durante su convalecencia se convirtió profundamente. Escribió los Ejercicios Espirituales y fundó la Compañía de Jesús (Jesuitas) en 1540, aprobada por el Papa Pablo III. Sus hijos espirituales evangelizaron el mundo entero y fundaron las grandes universidades católicas. Es un referente fundamental para la Iglesia en Argentina.',
    patrono: 'Ejercicios espirituales, Jesuitas, retiros',
  },
  '08-04': {
    nombre: 'San Juan María Vianney',
    fiesta: '4 de agosto',
    biografia: 'Juan María Vianney nació en Dardilly, Francia, en 1786. Cura de Ars durante 41 años, atrajo a peregrinos de todo el mundo por su santidad y don para el sacramento de la Confesión: pasaba hasta 16 horas diarias confesando. Fue un pastor extraordinario que transformó completamente la vida de su pueblo. Es el patrón de todos los sacerdotes del mundo.',
    patrono: 'Párrocos, sacerdotes, confesores',
  },
  '08-06': {
    nombre: 'Transfiguración del Señor',
    fiesta: '6 de agosto',
    biografia: 'La Transfiguración es el momento en que Jesús reveló su gloria divina a Pedro, Santiago y Juan en el Monte Tabor. Su rostro brilló como el sol y sus vestidos se volvieron blancos como la luz. Aparecieron Moisés y Elías conversando con Él, y una voz del cielo proclamó: "Este es mi Hijo amado, escuchadlo." Esta experiencia fortaleció a los apóstoles para aceptar la Pasión.',
    patrono: 'Contemplación, mística cristiana',
  },
  '08-10': {
    nombre: 'San Lorenzo Mártir',
    fiesta: '10 de agosto',
    biografia: 'Lorenzo fue diácono de la Iglesia de Roma en el siglo III. Cuando el prefecto romano le ordenó entregar los tesoros de la Iglesia, reunió a los pobres y enfermos y dijo: "Estos son los tesoros de la Iglesia." Fue condenado a morir asado sobre una parrilla, y según la tradición, con gran fortaleza dijo a sus verdugos: "Ya puedes darme vuelta, este lado ya está cocido."',
    patrono: 'Pobres, parrilleros, archivistas',
  },
  '08-11': {
    nombre: 'Santa Clara de Asís',
    fiesta: '11 de agosto',
    biografia: 'Clara nació en Asís, Italia, en 1194. Inspirada por la predicación de San Francisco, abandonó su vida noble para seguir a Cristo en la pobreza. Fundó la Orden de las Damas Pobres (Clarisas) y vivió 42 años en el monasterio de San Damián. Su amor por la Eucaristía era tan grande que una noche, estando enferma, vio en la pared de su celda la Misa que no podía asistir.',
    patrono: 'Televisión, bordadoras, clarividentes',
  },
  '08-15': {
    nombre: 'Asunción de la Virgen María',
    fiesta: '15 de agosto',
    biografia: 'La Solemnidad de la Asunción celebra el dogma definido por el Papa Pío XII en 1950: al terminar el curso de su vida terrena, la Virgen María fue elevada en cuerpo y alma a la gloria celestial. María, que había acogido a Dios en su seno y lo había seguido fielmente hasta el pie de la Cruz, participa ya plenamente de la Resurrección de su Hijo y prefigura la de todos los creyentes.',
    patrono: 'Argentina (fiesta patronal nacional), Francia, India',
  },
};

export const getSantoDelDia = (fecha: Date): Santo => {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  const clave = `${mes}-${dia}`;

  return (
    santos[clave] || {
      nombre: 'Santo del Día',
      fiesta: `${dia} de ${fecha.toLocaleDateString('es-AR', { month: 'long' })}`,
      biografia:
        'La Iglesia celebra hoy la memoria de los santos y beatos que vivieron su fe con fidelidad y son ejemplo para todos los creyentes. Unidos en la comunión de los santos, pedimos su intercesión.',
    }
  );
};
