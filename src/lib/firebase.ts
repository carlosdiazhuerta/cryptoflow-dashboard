import { initializeApp, getApps, getApp } from "firebase/app";

// Configuración de Firebase obtenida de la consola
const firebaseConfig = {
    apiKey: "AIzaSyBLOxfAykZNlCSFE8potPBAMziYCiyk6So",
    authDomain: "cryptoflow-dashboard.firebaseapp.com",
    projectId: "cryptoflow-dashboard",
    storageBucket: "cryptoflow-dashboard.firebasestorage.app",
    messagingSenderId: "195884683495",
    appId: "1:195884683495:web:661111fa81e387bb60d242"
};

// Inicializar Firebase (evitando inicializaciones múltiples en Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app };
