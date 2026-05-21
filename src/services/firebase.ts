import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Pegá acá la configuración de tu proyecto Firebase
// (console.firebase.google.com → tu proyecto → Configuración → SDK de Firebase)
const firebaseConfig = {
  apiKey: 'AIzaSyBvBoNpHkNs9NG5gJBlV2mNwyyWJUnsQMs',
  authDomain: 'parroquia-del-carmen.firebaseapp.com',
  projectId: 'parroquia-del-carmen',
  storageBucket: 'parroquia-del-carmen.firebasestorage.app',
  messagingSenderId: '1033190868297',
  appId: '1:1033190868297:web:29e34b9332ec35dba30698',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
