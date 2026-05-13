document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const keys = new Set();
document.addEventListener('keydown', (e) => {
  keys.add(e.key.toLowerCase());

  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.ctrlKey && e.shiftKey && e.key === 'J') ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
  }
});

document.addEventListener('keyup', (e) => {
  keys.delete(e.key.toLowerCase());
});

const sidebar = document.querySelector('.wiki-sidebar');
const toggleArea = document.querySelector('.wiki-sidebar h2');
const btn = document.getElementById('gn-idea');
const menu = document.getElementById('dropdownMenu');
const icon = document.getElementById('up-down-dropdown');
const textarea = document.getElementById('open-discuss');
const postBtn = document.getElementById('post');

if (sidebar) {
  sidebar.classList.add('collapsed');
}

document.querySelectorAll('.dropdownMoreToggle').forEach(toggle => {
  const dropdown = toggle.querySelector('.dropdown-more');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();

    const rect = toggle.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 250;

    if (spaceBelow >= dropdownHeight) {
      dropdown.classList.remove('open-up');
      dropdown.classList.add('open-down');
      dropdown.style.top = '5px';
      dropdown.style.bottom = 'auto';
    } else {
      dropdown.classList.remove('open-down');
      dropdown.classList.add('open-up');
      dropdown.style.bottom = '5px';
      dropdown.style.top = 'auto';
    }

    dropdown.classList.toggle('active');
  });
});

if (toggleArea) {
  toggleArea.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('collapsed');
  });
}

if (btn && menu && icon) {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
    icon.classList.toggle('rotate');
  });
}

if (textarea && postBtn) {
  textarea.addEventListener('input', () => {
    if (textarea.value.trim() !== '') {
      postBtn.style.background = '#ffffff';
      postBtn.style.color = '#0b1120';
      postBtn.style.transition = 'background 0.1s ease, color 0.1s ease';
    } else {
      postBtn.style.background = '#ffffff6e';
      postBtn.style.color = '#0b1120';
      postBtn.style.transition = 'background 0.1s ease, color 0.1s ease';
    }
  });
}

document.addEventListener('click', () => {
  if (menu) {
    menu.classList.remove('active');
  }
  if (icon) {
    icon.classList.remove('rotate');
  }
  document.querySelectorAll('.dropdown-more').forEach(d => {
    d.classList.remove('active');
  });
});