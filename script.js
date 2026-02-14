document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const message = document.getElementById('message');
    const buttonsContainer = document.querySelector('.buttons');
    const mainContainer = document.querySelector('.container');

    // Function to move the No button randomly
    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        noBtn.style.position = 'fixed'; // Use fixed to position relative to viewport
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    };

    // Events for No button interaction (hover and touch)
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click on touch devices
        moveNoButton();
    });

    // Yes button action
    yesBtn.addEventListener('click', () => {
        message.classList.remove('hidden');
        message.style.display = 'block';
        buttonsContainer.style.display = 'none'; // Hide buttons
        createHearts();
    });

    // Create falling hearts animation
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
