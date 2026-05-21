const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Busca automáticamente el archivo de clave de servicio
const keyFile = fs.readdirSync(path.join(__dirname, '..'))
  .find(f => f.includes('firebase-adminsdk') && f.endsWith('.json'));

if (!keyFile) {
  console.error('❌ No se encontró el archivo de clave de servicio (firebase-adminsdk*.json)');
  process.exit(1);
}

const serviceAccount = require(path.join(__dirname, '..', keyFile));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const misasData = {
  ordinarios: [
    { dia: 'Lunes',     horarios: ['18:30'] },
    { dia: 'Martes',    horarios: ['12:30'] },
    { dia: 'Miércoles', horarios: ['18:30'] },
    { dia: 'Jueves',    horarios: ['12:30'] },
    { dia: 'Viernes',   horarios: ['18:30'] },
    { dia: 'Sábado',    horarios: ['12:30', '18:00'], nota: 'Misa de las 18:00 con niños' },
    { dia: 'Domingo',   horarios: ['11:30', '19:30'] },
  ],
  contacto: {
    nombre: 'Parroquia del Carmen (Centro)',
    direccion: 'Rodríguez Peña 840, C1060 CABA',
    instagram: '@parroquiadelcarmenc',
    horarioSecretaria: 'Mar. y Jue.: 10:00 a 13:00\nLun., Mié. y Vie.: 17:00 a 20:00',
  },
};

async function seed() {
  console.log('⏳ Actualizando datos en Firestore...');

  await db.collection('config').doc('misas').set(misasData);
  console.log('✅ Horarios de misa actualizados');

  console.log('\n🎉 ¡Listo! Los datos ya están en Firebase.');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
