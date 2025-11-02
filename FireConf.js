import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBpFK6tLtdcYbGo372qn3EoB-CzkCFO7w",
  authDomain: "reachofvespers-4b501.firebaseapp.com",
  projectId: "reachofvespers-4b501",
  storageBucket: "reachofvespers-4b501.firebasestorage.app",
  messagingSenderId: "65089586909",
  appId: "1:65089586909:web:7d524beaf3a0d3211cfd34",
  measurementId: "G-0X8HLDCGNS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const googleSignInBtn = document.getElementById('google-signin-btn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes('connexion.html')) {
    window.location.href = 'index.html';
  }
});

function showError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
  }
}

function clearError() {
  if (errorMessage) {
    errorMessage.classList.remove('show');
  }
}

if (googleSignInBtn) {
  googleSignInBtn.addEventListener('click', async () => {
    clearError();
    googleSignInBtn.disabled = true;
    loading.classList.add('show');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
          lastLogin: new Date()
        });
      } else {
        await setDoc(userDocRef, {
          lastLogin: new Date()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      let errorMsg = 'Une erreur est survenue lors de la connexion';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMsg = 'La fenêtre de connexion a été fermée';
      } else if (error.code === 'auth/popup-blocked') {
        errorMsg = 'Les popups sont bloquées. Autorise-les pour te connecter';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMsg = 'Une autre demande de connexion est en cours';
      } else if (error.code === 'auth/network-request-failed') {
        errorMsg = 'Problème de connexion internet';
      }
      
      showError(errorMsg);
      googleSignInBtn.disabled = false;
      loading.classList.remove('show');
    }
  });
}

export { app, auth, db };



