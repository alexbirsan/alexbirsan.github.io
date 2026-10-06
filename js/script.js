// Build the email link from parts at runtime so bots scraping the HTML
// source can't harvest a plain-text address.
const emailLink = document.getElementById('emailLink');

if (emailLink) {
  const user = 'al3xbirsan';
  const domain = 'gmail.com';
  emailLink.href = 'mai' + 'lto:' + user + '@' + domain;
  emailLink.textContent = user + '@' + domain;
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
  });
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Reveal-on-scroll animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Portfolio filter tabs
const filterLinks = document.querySelectorAll('.filter-link');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    filterLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');

    const filter = link.dataset.filter;

    portfolioItems.forEach((item) => {
      const categories = item.dataset.category.split(' ');
      const show = filter === 'all' || categories.includes(filter);
      item.style.display = show ? '' : 'none';
    });
  });
});

// Active nav link highlight based on scroll position
const navbar = document.querySelector('.navbar');

const updateNavbar = () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 10);
};

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

const navAnchors = document.querySelectorAll('.navbar__links a[href^="#"]');

const updateActiveLink = () => {
  let active = navAnchors[0];

  // set active
  navAnchors.forEach((a) => {
    const section = document.querySelector(a.getAttribute('href'));
    if (section.getBoundingClientRect().top <= 1) active = a;
  });

  // The footer is too short to reach the top, so activate it at the page bottom
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    active = navAnchors[navAnchors.length - 1];
  }

  navAnchors.forEach((a) => a.classList.toggle('active', a === active));
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
