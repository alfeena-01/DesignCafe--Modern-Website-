// Scroll Reveal Animation Logic
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Trigger counter if the stats section is seen
            if (entry.target.id === 'stats-section') {
                startCounters();
            }
            // Stop observing once animation is triggered to prevent re-runs
            if (entry.target.classList.contains('active')) {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-zoom').forEach((el) => {
    observer.observe(el);
});

// Stats Counter Logic
function startCounters() {
    const counters = document.querySelectorAll('.stat-count');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        // Determine speed based on target size
        const increment = target / 100;

        if (count < target) {
            const updateCount = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        }
    });
}

// Also observe the stats section specifically for the counter
observer.observe(document.querySelector('#stats-section'));

// Subtle 3D Tilt Effect for Cards
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});