const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  );
});
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  });
});
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
} else revealItems.forEach((item) => item.classList.add('visible'));
const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a[href^="#"]');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((link) =>
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        )
      );
    }
  });
}, { rootMargin: '-30% 0px -55% 0px' });
sections.forEach((section) => activeObserver.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();
