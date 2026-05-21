let audioEnabled = true; // Audio activé par défaut

function activatePortal() {
    const body = document.body;
    const ripples = document.querySelectorAll('.portal-ripple');
    
    // Play portal sound
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


