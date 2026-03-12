import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCtvaCAVjfxboH-AHIhd8SwjlSs_Y1rKyA',
  authDomain: 'workbench-nikhil-work-tracker.firebaseapp.com',
  projectId: 'workbench-nikhil-work-tracker',
  storageBucket: 'workbench-nikhil-work-tracker.firebasestorage.app',
  messagingSenderId: '397883168953',
  appId: '1:397883168953:web:b840747b88b3b719fe6368',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
