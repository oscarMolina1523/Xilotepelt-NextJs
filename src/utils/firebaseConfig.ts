// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ2eALSdIvsp-5ylG4dgz4_rW4-s69FTA',
  authDomain: 'xilotepelt-307ea.firebaseapp.com',
  projectId: 'xilotepelt-307ea',
  storageBucket: 'xilotepelt-307ea.appspot.com',
  messagingSenderId: '854838042017',
  appId: '1:854838042017:web:xxxxx',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
