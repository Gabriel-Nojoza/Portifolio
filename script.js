// Inicializar AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Altura da navbar
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Efeito de digitação na seção hero
const heroText = document.querySelector('.typing-text');
const text = heroText.textContent;
heroText.textContent = '';

const typeWriter = (text, i = 0) => {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 100);
    }
};

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    setTimeout(() => typeWriter(text), 500);
});

// Filtro de projetos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Botão Scroll to Top
const scrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Formulário de contato com validação
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validação básica
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (name.value.trim() === '') {
        showError(name, 'Por favor, insira seu nome');
        isValid = false;
    } else {
        removeError(name);
    }

    if (email.value.trim() === '') {
        showError(email, 'Por favor, insira seu email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Por favor, insira um email válido');
        isValid = false;
    } else {
        removeError(email);
    }

    if (message.value.trim() === '') {
        showError(message, 'Por favor, insira sua mensagem');
        isValid = false;
    } else {
        removeError(message);
    }

    if (isValid) {
        // Aqui você pode adicionar o código para enviar o formulário
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorMessage);
    }
    formGroup.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        formGroup.removeChild(errorMessage);
    }
    formGroup.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Adicionar classe active ao link da navegação baseado na seção visível
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});