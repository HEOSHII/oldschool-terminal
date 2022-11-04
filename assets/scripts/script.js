import { texts, data, MENU, TYPES } from './data.js';
import { sounds } from './sounds.js';
import { changeTheme, setThemeName } from './themeChanger.js';

const app = document.getElementById('app');

let typingSpeed = 50; //Typing speed

app.innerHTML = texts.getWarningText();

const rainbowImnterval = setInterval(() => {
  $('.rainbow-text').style.color = `#${Math.floor(Math.random() * '0xfffff')}`;
}, 300);

document.addEventListener('keydown', startSystem);

let instructionsTimeout;
let isTyping;
let delay;
let turbo;

function startSystem(event) {
  if (event.code !== 'Enter') return;
  clearInterval(rainbowImnterval);

  instructionsTimeout = setTimeout(() => {
    $('.instructions').classList.remove('hidden');
  }, 5000);

  app.innerHTML = '';

  sounds.playCompAtmosLoop();
  sounds.playTransitionSound();
  document.body.classList.add('started');

  let loadingPoints = 0;
  const loadingText = document.createElement('p');
  loadingText.textContent = 'Loading';
  app.appendChild(loadingText);

  const loadingProcess = setInterval(() => {
    if (loadingPoints === 3) {
      loadingText.textContent = 'Loading';
      loadingPoints = 0;
      return;
    }
    loadingText.textContent += '.';
    loadingPoints++;
  }, 300);

  // LOAD MAIN MENU AFTER 3 sec of pushing ENTER
  setTimeout(() => {
    clearInterval(loadingProcess);
    loadMenu(MENU.MAIN);
  }, 1000);

  //Clear ENTER listener for START SYSTEM
  document.removeEventListener('keydown', startSystem);
}

function loadMenu(menu) {
  clear(app);
  setMenuTitle(menu);
  typingSpeed = 50;
  isTyping = true;
  const titlesArr = [];
  data[menu].map(item => titlesArr.push(item.title));
  const linksList = document.createElement('ul');
  linksList.className = 'links__list';
  app.appendChild(linksList);
  data[menu].map((item, index) => {
    delay = turbo ? 0 : index === 0 ? 0 : titlesArr.slice(0, index).join().length * typingSpeed;
    const link = document.createElement('li');
    [link.className, link.id, link.dataset.type] = ['link', item.id, item.type];
    item.target ? (link.dataset.target = item.target) : null;
    item.url ? (link.dataset.url = item.url) : null;
    item.specialAttr ? (link.dataset.attr = item.specialAttr) : null;
    linksList.appendChild(link);
    typingText(item, link, delay);
  });
  delay = turbo ? 0 : titlesArr.join().length * typingSpeed;
  setTimeout(setFocusInMenu, delay);
}

function typingText(text, element, delay) {
  let letterNumber = 0;
  setTimeout(
    () => {
      const typingInterval = setInterval(() => {
        element.textContent += text.title[letterNumber];
        letterNumber++;
        sounds.playRandomKeyboardSound();
        if (letterNumber >= text.title.length) {
          clearInterval(typingInterval);
          if (text.fa) {
            element.innerHTML += text.fa;
          }
          return;
        }
      }, typingSpeed);
    },
    turbo ? 0 : delay,
  );
}

function setMenuTitle(menu) {
  $('.current-menu').textContent = `•  ${menu}  •`;
  $('.current-menu').dataset.currentMenu = menu;
}

function setFocusInMenu() {
  isTyping = false;
  turbo = false;
  const actualList = document.querySelector('.links__list');
  const actualLinks = actualList.querySelectorAll('li');
  actualLinks[0].classList.add('focus');
  document.addEventListener('keydown', pressedKey);
}

function pressedKey(e) {
  if (
    e.code !== 'ArrowUp' &&
    e.code !== 'ArrowDown' &&
    e.code !== 'ArrowRight' &&
    e.code !== 'ArrowLeft' &&
    e.code !== 'Enter' &&
    e.code !== 'Escape' &&
    e.code !== 'Backspace'
  ) {
    return;
  }

  clearTimeout(instructionsTimeout);
  setTimeout(() => {
    $('.instructions').classList.add('hidden');
  }, 100);

  instructionsTimeout = setTimeout(() => {
    $('.instructions').classList.remove('hidden');
  }, 10000);

  sounds.playRandomKeyboardSound();

  const actualList = document.querySelector('.links__list');
  const actualLinks = actualList.querySelectorAll('li');
  const actualMenu = document.querySelector('.current-menu');
  const focusedLink = document.querySelector('.focus');

  if (e.code === 'Escape' || e.code === 'ArrowLeft' || e.code === 'Backspace') {
    if (isTyping) {
      typingSpeed = 0;
      turbo = true;
      return;
    }
    if (actualMenu.dataset.currentMenu !== MENU.MAIN && !isTyping) {
      loadMenu(data[actualMenu.dataset.currentMenu].find(item => item.title === '<').id);
      document.removeEventListener('keydows', pressedKey);
      return;
    } else {
      sounds.playErrorSound();
    }
  }

  if (e.code === 'Enter' || e.code === 'ArrowRight') {
    sounds.playEnterSound();

    if (focusedLink.dataset.type === TYPES.CHANGER) {
      changeTheme();
      return;
    }

    if (focusedLink.dataset.type === TYPES.MENU) {
      document.removeEventListener('keydows', pressedKey);
      focusedLink.classList.add('choosen');
      setTimeout(() => loadMenu(focusedLink.id), 500);
      return;
    }

    if (focusedLink.dataset.type === TYPES.LINK) {
      focusedLink.classList.add('choosen');
      const link = document.createElement('a');
      link.setAttribute('href', focusedLink.dataset.url);
      if (focusedLink.dataset.attr) {
        link.setAttribute(focusedLink.dataset.attr, 'Georgii_Shyriaiev_CV');
      }
      if (focusedLink.dataset.target) {
        link.setAttribute('target', focusedLink.dataset.target);
      }
      link.click();
      setTimeout(() => {
        focusedLink.classList.remove('choosen');
      }, 500);
      return;
    }

    if (focusedLink.dataset.type === TYPES.INFO) {
      focusedLink.classList.add('choosen');
      loadInfo(focusedLink.id);
    }
    return;
  }

  switch (e.code) {
    case 'ArrowUp':
      if ($('.changer').classList.contains('focus')) {
        $('.changer').classList.remove('focus');
        setThemeName('Theme');
        actualLinks[actualLinks.length - 1].classList.add('focus');
        break;
      }
      focusedLink.classList.remove('focus');
      if (focusedLink.previousSibling !== null) {
        focusedLink.previousSibling.classList.add('focus');
      } else {
        $('.changer').classList.add('focus');
        setThemeName();
      }
      break;

    case 'ArrowDown':
      if ($('.changer').classList.contains('focus')) {
        $('.changer').classList.remove('focus');
        setThemeName('Theme');
        actualLinks[0].classList.add('focus');
        break;
      }
      focusedLink.classList.remove('focus');
      if (focusedLink.nextSibling !== null) {
        focusedLink.nextSibling.classList.add('focus');
      } else {
        $('.changer').classList.add('focus');
        setThemeName();
      }
      break;

    default:
      break;
  }
}

function clear(element) {
  element.textContent = '';
}
