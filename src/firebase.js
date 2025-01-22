// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAyLJwseXraAd6RzZmtRYlGFBxkrLPv4PQ",
  authDomain: "ascfr-refonte.firebaseapp.com",
  projectId: "ascfr-refonte",
  storageBucket: "ascfr-refonte.appspot.com",
  messagingSenderId: "192382773773",
  appId: "your-app-id",
  databaseURL:
    "https://fffire-261e4-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);

// Initialisation des services Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Utilisation dans ton projet
console.log("Firebase configuré avec succès");
