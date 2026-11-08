const toggleButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const yearEl = document.getElementById('year');
const form = document.querySelector('.contact-form');

// Set current year in footer
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile nav toggle
if (toggleButton && nav) {
  toggleButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form — submits to Formspree, shows success message
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Sending…';
    button.disabled = true;

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        button.textContent = '✅ Enquiry Sent!';
        form.reset();
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 3000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      button.textContent = '❌ Failed — try again';
      button.disabled = false;
      setTimeout(() => {
        button.textContent = originalText;
      }, 3000);
    }
  });
}

// Smooth reveal animation on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.info-card, .project-card, .feature-box, .amenity-grid span').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});
