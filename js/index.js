// Confetti button functionality
document.getElementById('confetti-button').addEventListener('click', function() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    startVelocity: 25,
    decay: 0.94,
    scalar: 1.2
  });
});

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-8V7LBDDE0S');

