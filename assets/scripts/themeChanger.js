import { themes } from './data.js';
import { sounds } from './sounds.js';

const defaultTheme = themes[0];
let theme = themes.indexOf(defaultTheme);
document.body.dataset.theme = defaultTheme;

setThemeName('Theme');
$('.changer').addEventListener('click', changeTheme);

$('.changer').addEventListener('mouseover', () => {
  $('.changer').classList.add('focus');
  $('.links__list')
    .querySelectorAll('.link')
    .forEach(li => li.classList.remove('focus'));
  setThemeName();
});

$('.changer').addEventListener('mouseleave', () => {
  $('.links__list').querySelector('.link').classList.add('focus');
  $('.changer').classList.remove('focus');
  setThemeName('Theme');
});

export function changeTheme() {
  sounds.playThemeChangeSound();
  theme = theme + 1 === themes.length ? 0 : theme + 1;
  document.body.dataset.theme = themes[theme];
  document.body.style.border = `20px double var(--terminal-shadow-color)`;
  document.body.style.transform = `scale(0.97)`;
  setTimeout(() => {
    document.body.style.border = `4px double var(--terminal-shadow-color)`;
    document.body.style.transform = `scale(1)`;
  }, 300);
  setThemeName();
}

export function setThemeName(name) {
  $('.theme-name').textContent = name ? name : themes[theme];
}
