document.getElementById('year').textContent = new Date().getFullYear();

const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menuToggle');
const menuDropdown = document.getElementById('menuDropdown');

function closeMenu() {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

menuDropdown.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
