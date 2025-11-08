// ==================== //
// Intersection Observer for Scroll Animations
// ==================== //

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with data-animate attribute
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => observer.observe(el));
});

// ==================== //
// Mobile Menu Toggle
// ==================== //

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu && navMenu.classList.contains('active')) {
    if (!navMenu.contains(e.target) && e.target !== mobileMenuBtn) {
      mobileMenuBtn.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// ==================== //
// Navbar Scroll Effect
// ==================== //

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ==================== //
// Progress Bar
// ==================== //

const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
});

// ==================== //
// Counter Animation
// ==================== //

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.ceil(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(current);
    }
  }, 16);
}

// Observe counter elements
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => counterObserver.observe(counter));
});

// ==================== //
// Smooth Scroll for Anchor Links
// ==================== //

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== //
// Back to Top Button
// ==================== //

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== //
// Lazy Loading Images
// ==================== //

if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
}

// ==================== //
// Parallax Effect for Hero
// ==================== //

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroContent && window.innerWidth > 768) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / 600);
  }
  
  if (heroBackground && window.innerWidth > 768) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ==================== //
// Add animation classes on page load
// ==================== //

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ==================== //
// Console Easter Egg
// ==================== //

console.log('%c👋 안녕하세요!', 'font-size: 20px; font-weight: bold; color: #d92525;');
console.log('%cJENNET 웹사이트를 방문해 주셔서 감사합니다.', 'font-size: 14px; color: #666;');
console.log('%c문의: 010-8872-6800', 'font-size: 12px; color: #999;');