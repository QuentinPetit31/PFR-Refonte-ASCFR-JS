import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY, // Utilisation de la variable d'environnement
  authDomain: import.meta.env.VITE_AUTH_DOMAIN, // Utilisation de la variable d'environnement
  projectId: import.meta.env.VITE_PROJECT_ID, // Utilisation de la variable d'environnement
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET, // Utilisation de la variable d'environnement
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID, // Utilisation de la variable d'environnement
  appId: import.meta.env.VITE_APP_ID, // Utilisation de la variable d'environnement
  databaseURL:
    "https://fffire-261e4-default-rtdb.europe-west1.firebasedatabase.app", // Ajoutez cette ligne
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter le service d'authentification pour l'utiliser dans les composants
export const auth = getAuth(app);
