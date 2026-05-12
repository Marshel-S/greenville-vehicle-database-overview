document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const sidebar = document.querySelector('.wiki-sidebar');
const toggleArea = document.querySelector('.wiki-sidebar h2');
const btn = document.getElementById('gn-idea');
const menu = document.getElementById('dropdownMenu');
const icon = document.getElementById('up-down-dropdown');
const textarea = document.getElementById('open-discuss');
const postBtn = document.getElementById('post');
const dropdownMoreToggle = document.getElementById('dropdownMoreToggle');
const dropdownMore = document.getElementById('dropdownMore');

if (sidebar) {
  sidebar.classList.add('collapsed');
}

dropdownMoreToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMore.classList.toggle('active');
});

document.addEventListener('click', () => {
  dropdownMore.classList.remove('active');
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

  document.addEventListener('click', () => {
    menu.classList.remove('active');
    icon.classList.remove('rotate');
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