import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvBoNpHkNs9NG5gJBlV2mNwyyWJUnsQMs',
  authDomain: 'parroquia-del-carmen.firebaseapp.com',
  projectId: 'parroquia-del-carmen',
  storageBucket: 'parroquia-del-carmen.firebasestorage.app',
  messagingSenderId: '1033190868297',
  appId: '1:1033190868297:web:29e34b9332ec35dba30698',
};

let _db: Firestore | null = null;

export const getDb = (): Firestore | null => {
  try {
    if (!_db) {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      _db = getFirestore(app);
    }
    return _db;
  } catch (e) {
    return null;
  }
};
