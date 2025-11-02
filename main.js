let audioEnabled = false;

// Check if audio permission was already granted
function checkAudioPermission() {
    const savedPermission = localStorage.getItem('audioPermission');
    const overlay = document.getElementById('audioPermissionOverlay');
    
    if (!overlay) {
        console.error('Element audioPermissionOverlay introuvable');
        return;
    }
    
    if (savedPermission === 'granted') {
        audioEnabled = true;
        overlay.classList.add('hidden');
    } else if (savedPermission === 'denied') {
        audioEnabled = false;
        overlay.classList.add('hidden');
    } else {
        // Première visite, afficher la modale
        overlay.style.display = 'flex';
    }
}

function allowAudio() {
    audioEnabled = true;
    localStorage.setItem('audioPermission', 'granted');
    const overlay = document.getElementById('audioPermissionOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
    console.log('Audio autorisé');
}

function denyAudio() {
    audioEnabled = false;
    localStorage.setItem('audioPermission', 'denied');
    const overlay = document.getElementById('audioPermissionOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
    console.log('Audio désactivé');
}

function activatePortal() {
    const body = document.body;
    const ripples = document.querySelectorAll('.portal-ripple');
    
    // Play portal sound if audio is enabled
    if (audioEnabled) {
        const portalSound = new Audio('elemental-magic-spell-impact-outgoing-228342.mp3');
        portalSound.volume = 0.7;
        portalSound.play().catch(err => console.log('Erreur audio:', err));
    }
    
    // Just activate existing ripples
    ripples.forEach(ripple => ripple.classList.add('active'));
    
    // Trigger shake animation
    body.classList.add('portal-active');
    
    for (let i = 0; i < 5; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'portal-ripple';
        body.appendChild(ripple);
    }
    
    // Force reflow then add active class to trigger animation
    body.offsetHeight;
    
    // Trigger shake animation
    body.classList.add('portal-active');
    
    // Redirect after 5 seconds
    setTimeout(() => {
        window.location.href = ''; // Mets ton lien ici
    }, 5000);
}

// Firebase Auth State Listener
function updateAuthUI(user) {
    const authLink = document.getElementById('auth-link'); // Changé de 'authLink' à 'auth-link'
    
    if (!authLink) {
        console.error('Element auth-link introuvable');
        return;
    }
    
    if (user && user.email) {
        // User is signed in
        authLink.textContent = user.email;
        authLink.href = 'deconnexion.html';
        authLink.style.background = 'linear-gradient(135deg, #8a2be2 0%, #9d4edd 100%)';
        authLink.style.webkitBackgroundClip = 'text';
        authLink.style.webkitTextFillColor = 'transparent';
        authLink.style.backgroundClip = 'text';
    } else {
        // User is signed out
        authLink.textContent = 'Connexion';
        authLink.href = 'connexion.html';
        authLink.style.background = '';
        authLink.style.webkitBackgroundClip = '';
        authLink.style.webkitTextFillColor = '';
        authLink.style.backgroundClip = '';
    }
}

// Check permission on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAudioPermission();
});
