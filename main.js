/* ═══════════════════════════════════
   NAV SCROLL EFFECT
   ═══════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ═══════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMobile() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

/* ═══════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ═══════════════════════════════════
   COUNTER ANIMATION
   ═══════════════════════════════════ */
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + (target >= 100 && current >= target ? '+' : '') + suffix;
            }, 25);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ═══════════════════════════════════
   SPARK PARTICLES
   ═══════════════════════════════════ */
const canvas = document.getElementById('sparks-canvas');
const ctx = canvas.getContext('2d');
let sparks = [];
let mouse = { x: -100, y: -100 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Spawn sparks near cursor occasionally
    if (Math.random() < 0.3) {
        for (let i = 0; i < 2; i++) {
            sparks.push({
                x: mouse.x,
                y: mouse.y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 1,
                decay: 0.02 + Math.random() * 0.03,
                size: Math.random() * 2 + 0.5,
                color: Math.random() > 0.5 ? '#4a8eff' : '#ff6b2c'
            });
        }
    }
});

function animateSparks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks = sparks.filter(s => s.life > 0);

    sparks.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gravity
        s.life -= s.decay;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.life * 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    requestAnimationFrame(animateSparks);
}
animateSparks();

/* ═══════════════════════════════════
   FORM HANDLING
   ═══════════════════════════════════ */
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.textContent = 'Tack! Vi hör av oss.';
    btn.style.background = '#22c55e';
    setTimeout(() => {
        btn.innerHTML = 'Skicka förfrågan <span class="btn-arrow">&rarr;</span>';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

/* ═══════════════════════════════════
   SMOOTH ANCHOR OFFSET
   ═══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});