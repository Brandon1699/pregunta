document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const message = document.getElementById('message');
    const buttonsContainer = document.querySelector('.buttons');

    let isMoving = false;
    let x = 0;
    let y = 0;
    let vx = 3; // Horizontal velocity
    let vy = 3; // Vertical velocity
    let animationId;

    // Initialize position
    function initPosition() {
        const rect = noBtn.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
        // Ensure accurate starting position for fixed
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    // DVD Bouncing Logic
    const updatePosition = () => {
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Update position
        x += vx;
        y += vy;

        // Check collisions with window boundaries
        if (x + buttonWidth >= screenWidth || x <= 0) {
            vx = -vx; // Reverse horizontal direction
            x = Math.max(0, Math.min(x, screenWidth - buttonWidth)); // Clamp
        }
        if (y + buttonHeight >= screenHeight || y <= 0) {
            vy = -vy; // Reverse vertical direction
            y = Math.max(0, Math.min(y, screenHeight - buttonHeight)); // Clamp
        }

        // Apply new position
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;

        // Continue loop
        if (isMoving) {
            animationId = requestAnimationFrame(updatePosition);
        }
    };

    const startMoving = (e) => {
        if (e.type === 'touchstart') e.preventDefault(); // Prevent default only on touch

        if (!isMoving) {
            initPosition(); // Capture current position before moving
            isMoving = true;
            yesBtn.classList.add('pulsing'); // Start pulsing Yes button

            // Randomize initial direction slightly
            vx = (Math.random() > 0.5 ? 3 : -3) * (Math.random() * 0.5 + 0.8);
            vy = (Math.random() > 0.5 ? 3 : -3) * (Math.random() * 0.5 + 0.8);

            updatePosition(); // Start loop
        }
    };

    // Events for No button interaction (hover and touch)
    noBtn.addEventListener('mouseover', startMoving);
    noBtn.addEventListener('touchstart', startMoving, { passive: false });

    // Yes button action
    yesBtn.addEventListener('click', () => {
        isMoving = false; // Stop the loop
        cancelAnimationFrame(animationId);

        message.classList.remove('hidden');
        message.style.display = 'block';
        buttonsContainer.style.display = 'none'; // Hide buttons
        yesBtn.classList.remove('pulsing'); // Stop pulsing
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
        }, 225); // Faster interval for 25% more hearts
    }
});
