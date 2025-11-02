        let audioEnabled = false;

        // Check if audio permission was already granted
        function checkAudioPermission() {
            const savedPermission = localStorage.getItem('audioPermission');
            if (savedPermission === 'granted') {
                audioEnabled = true;
                document.getElementById('audioPermissionOverlay').classList.add('hidden');
            }
        }

        function allowAudio() {
            audioEnabled = true;
            localStorage.setItem('audioPermission', 'granted');
            document.getElementById('audioPermissionOverlay').classList.add('hidden');
            console.log('Audio autorisé');
            // Tu peux ajouter ici ton code pour initialiser l'audio
        }

        function denyAudio() {
            audioEnabled = false;
            localStorage.setItem('audioPermission', 'denied');
            document.getElementById('audioPermissionOverlay').classList.add('hidden');
            console.log('Audio désactivé');
        }

        function activatePortal() {
            const body = document.body;
            const ripples = document.querySelectorAll('.portal-ripple');
            
            // Play portal sound if audio is enabled
            if (audioEnabled) {
                // Ton code audio personnalisé ici
                console.log('Audio du portail activé');
            }
            if (audioEnabled) {
                const portalSound = new Audio('elemental-magic-spell-impact-outgoing-228342.mp3'); // Mets l'URL de ton fichier audio ici
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

        // Check permission on page load

        checkAudioPermission();

        // Firebase Auth State Listener
        // Tu dois avoir Firebase initialisé dans ton projet
        // Cette fonction détecte si l'utilisateur est connecté
        function updateAuthUI(user) {
            const authLink = document.getElementById('authLink');
            if (user && user.email) {
                // User is signed in
                authLink.textContent = user.email;
                authLink.href = 'Deconnexion.html';
                authLink.style.background = 'linear-gradient(135deg, #8a2be2 0%, #9d4edd 100%)';
                authLink.style.webkitBackgroundClip = 'text';
                authLink.style.webkitTextFillColor = 'transparent';
                authLink.style.backgroundClip = 'text';
            } else {
                // User is signed out
                authLink.textContent = 'Connexion';
                authLink.href = 'Connexion.html';
                authLink.style.background = '';
                authLink.style.webkitBackgroundClip = '';
                authLink.style.webkitTextFillColor = '';
                authLink.style.backgroundClip = '';
            }
        }
