import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase usando variables de entorno (asegúrate de que estas variables estén definidas)
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar auth y db para usarlos en otros módulos
export { auth, db };
