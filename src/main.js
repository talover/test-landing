import './styles.scss';

const header = document.querySelector('.header');
const nav = document.querySelector('.header__nav');
const toggle = document.querySelector('.header__toggle');
const links = document.querySelectorAll('a[href^="#"]');
const form = document.querySelector('.form');
const formNote = document.querySelector('.form__note');

const setHeaderState = () => {
  header.classList.toggle('header--scrolled', window.scrollY > 16);
};

const closeMenu = () => {
  if (!toggle || !nav) return;

  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('header__nav--open');
  document.body.classList.remove('page-lock');
};

toggle?.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';

  toggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('header__nav--open', !isOpen);
  document.body.classList.toggle('page-lock', !isOpen);
});

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = targetId && document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  form.reset();

  if (formNote) {
    formNote.textContent = 'Thanks. Your request is ready for a real backend integration.';
  }
});

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });
