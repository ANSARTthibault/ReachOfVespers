// -- Imports (si votre HTML utilise <script type="module">) --
// Dans ce fichier JS séparé, vous devrez importer les fonctions de Firebase
// que vous avez déjà chargées via les CDN dans votre HTML (via l'import dans <script type="module">)
// Cela suppose que votre 'mon-script-principal.js' est lui-même un module.
// Si votre HTML charge les SDK via <script src="..."> sans type="module",
// alors les objets 'firebase' sont globaux et vous n'avez pas besoin de ces imports ici.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


// -- Début du code de l'Étape 3: Initialisation de Firebase --
const firebaseConfig = {
  apiKey: "AIza...", // Votre clé API
  authDomain: "reachofvespers-4b501.firebaseapp.com",
  projectId: "reachofvespers-4b501",
  storageBucket: "reachofvespers-4b501.appspot.com",
  messagingSenderId: "...",
  appId: "1:...",
  measurementId: "G-..." // Optionnel
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

// Initialisation du service d'authentification
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (typeof updateAuthUI === 'function') {
    updateAuthUI(user);
  }
});
// -- Fin du code de l'Étape 3 --


// -- Début du code de l'Étape 4: Utilisation du service d'authentification --
const provider = new GoogleAuthProvider();

function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Utilisateur connecté :", result.user.displayName);
      // Gérer la connexion réussie
    })
    .catch((error) => {
      console.error("Erreur de connexion Google :", error.message);
      // Gérer les erreurs
    });
}

// Associer la fonction à un événement de clic sur un bouton
document.addEventListener('DOMContentLoaded', () => {
  const signInButton = document.getElementById('btn-google-signin');
  if (signInButton) {
    signInButton.addEventListener('click', signInWithGoogle);
  }
});
// -- Fin du code de l'Étape 4 --


