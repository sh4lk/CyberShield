// Charger navbar et footer
async function loadComponent(file, placeholderId) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;
  } catch (error) {
    console.error(`Erreur chargement ${file}:`, error);
  }
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('components/navbar.html', 'navbar-placeholder');
  await loadComponent('components/footer.html', 'footer-placeholder');

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navbar = document.querySelector('.navbar');
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Animations au scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );

  const animated = document.querySelectorAll(
    '.service-card, .service-detail, .contact-card, .feature-item'
  );
  animated.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  // Shadow navbar au scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,170,228,0.15)';
    } else {
      navbar.style.boxShadow = '0 1px 3px rgba(0,170,228,0.08)';
    }
  });
});
