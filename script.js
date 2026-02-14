document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initScrollReveal();
    initBackToTop();
    initSkillAnimations();
    initParticles();
    initEventListeners();
    initPrintAndDownload();
});

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, 1200);
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    function handleScroll() {
        revealElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkillBars() {
        skillItems.forEach(item => {
            if (item.classList.contains('active')) {
                const percent = item.getAttribute('data-percent');
                const skillLevel = item.querySelector('.skill-level');
                
                if (skillLevel && !skillLevel.style.width) {
                    const delay = Array.from(skillItems).indexOf(item) * 100;
                    
                    setTimeout(() => {
                        skillLevel.style.width = `${percent}%`;
                        skillLevel.style.setProperty('--target-width', `${percent}%`);
                    }, delay);
                }
            }
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                setTimeout(animateSkillBars, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(i);
    }
    
    function createParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 15 + 15;
        const opacity = Math.random() * 0.1 + 0.05;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}vw;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${opacity};
            background: linear-gradient(45deg, 
                hsl(${Math.random() * 60 + 150}, 100%, 65%), 
                hsl(${Math.random() * 60 + 200}, 100%, 65%)
            );
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: var(--opacity);
            }
            90% {
                opacity: var(--opacity);
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            animation: particleFloat linear infinite;
        }
    `;
    document.head.appendChild(style);
}

function initEventListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
    
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initPrintAndDownload() {
    const printBtn = document.getElementById('printBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            if (confirm('Cetak CV ini?')) {
                document.body.classList.add('printing');
                
                setTimeout(() => {
                    window.print();
                    
                    setTimeout(() => {
                        document.body.classList.remove('printing');
                    }, 500);
                }, 100);
            }
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('Fitur download PDF memerlukan library tambahan seperti jsPDF atau html2pdf.js.\n\nUntuk implementasi lengkap, silahkan install salah satu library tersebut.');
        });
    }
}