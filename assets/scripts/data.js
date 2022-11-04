export const MENU = {
  MAIN: 'Main',
  ABOUT: `About_Me`,
  CONTACTS: 'Contacts',
  EXPERIENCE: 'Experiene',
  EDUCATION: 'Education',
  BASIC: 'Basic',
  COUSERS: 'Courses',
  SKILLS: 'Skills',
  SOFT: 'Soft',
  HARD: 'Hard',
  HOBBIES: 'Hobbies',
  CALL: 'Call_Me',
  TELEGRAM: 'Text_Me',
  EMAIL: 'Send_Me_Mail',
  BACK: '<',
};

export const TYPES = {
  MENU: 'menu',
  LINK: 'link',
  CHANGER: 'changer',
  INFO: 'info',
};

export const texts = {
  warningTitle: 'Read this before continue!',
  start: 'Press ENTER to continue',
  warning: `This website contains <strong class="rainbow-text">SOUNDS</strong> of keyboard, old computer etc. Sounds will start after push the ENTER button. `,
  getWarningText() {
    return `
      <div class="warning">
        <strong class="warning__title">${this.warningTitle}</strong>
        <p class="warning__text" style="max-width: 500px; text-align: center; margin-bottom: 20px">${this.warning}</p>
        <p class="warning__enter-text" style="font-size: 20px; text-align: center">${this.start}</p>
      </div>`;
  },
  url: {
    phoneNumber: '+380504257237',
    telegram: 'https://t.me/heoshii',
    email: 'george.shiryaev@gmail.com',
  },
};

export const data = {
  Main: [
    {
      fa: `<i class="fa-solid fa-user"></i>`,
      type: TYPES.MENU,
      title: MENU.ABOUT,
      id: MENU.ABOUT,
    },

    {
      fa: `<i class="fa-solid fa-address-book"></i>`,
      type: TYPES.MENU,
      title: MENU.CONTACTS,
      id: MENU.CONTACTS,
    },

    {
      fa: `<i class="fa-solid fa-floppy-disk"></i>`,
      type: TYPES.LINK,
      title: 'Download_CV',
      specialAttr: 'download',
      url: './assets/files/GeorgiiShyriaiev_CV.pdf',
      id: 'CV',
    },
  ],
  About_Me: [
    {
      fa: `<i class="fa-solid fa-briefcase"></i>`,
      type: TYPES.MENU,
      title: MENU.EXPERIENCE,
      id: MENU.EXPERIENCE,
    },
    {
      fa: `<i class="fa-solid fa-user-tie"></i>`,
      type: TYPES.MENU,
      title: MENU.SKILLS,
      id: MENU.SKILLS,
    },
    {
      fa: `<i class="fa-solid fa-user-graduate"></i>`,
      type: TYPES.MENU,
      title: MENU.EDUCATION,
      id: MENU.EDUCATION,
    },
    {
      fa: `<i class="fa-solid fa-user-astronaut"></i>`,
      type: TYPES.MENU,
      title: MENU.HOBBIES,
      id: MENU.HOBBIES,
    },
    {
      type: TYPES.MENU,
      title: MENU.BACK,
      id: MENU.MAIN,
    },
  ],
  Contacts: [
    {
      fa: `<i class="fa-solid fa-phone"></i>`,
      title: MENU.CALL,
      url: `tel:${texts.url.phoneNumber}`,
      id: MENU.CALL,
      type: TYPES.LINK,
    },
    {
      fa: `<i class="fa-brands fa-telegram"></i>`,
      title: MENU.TELEGRAM,
      id: MENU.TELEGRAM,
      url: texts.url.telegram,
      target: '_blank',
      type: TYPES.LINK,
    },
    {
      fa: `<i class="fa-solid fa-envelope"></i>`,
      title: MENU.EMAIL,
      url: `mailto:${texts.url.email}`,
      id: MENU.EMAIL,
      type: TYPES.LINK,
    },
    {
      title: MENU.BACK,
      id: MENU.MAIN,
      type: TYPES.MENU,
    },
  ],
  Education: [
    {
      fa: `<i class="fa-solid fa-graduation-cap"></i>`,
      title: MENU.BASIC,
      id: MENU.BASIC,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-solid fa-book"></i>`,
      title: MENU.COUSERS,
      id: MENU.COUSERS,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
  ],
  Basic: [
    {
      title: `National University of Telecommunications. Kyiv. 
      (2012-2015)`,
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
    {
      title: `College of radio electronics. Dnipro. 2008-2012`,
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
  ],
  Courses: [
    {
      title: 'SoftServe Mentor. JS Jedi. Online (2021)',
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
    {
      title: 'SoftServe Mentor. HTML/CSS/JS Fundamentals. Online (2021)',
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
    {
      title: 'SkillUp Academy. Software testing. Dnipro (2015)',
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
    {
      title: '"STEP" Academy. WEB development and SEO. Dnipro (2012-2013)',
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.EDUCATION,
      type: TYPES.MENU,
    },
  ],
  Skills: [
    {
      fa: `<i class="fa-solid fa-face-smile-wink"></i>`,
      title: MENU.SOFT,
      id: MENU.SOFT,
      type: TYPES.MENU,
    },

    {
      fa: `<i class="fa-solid fa-microchip"></i>`,
      title: MENU.HARD,
      id: MENU.HARD,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
  ],
  Hard: [
    {
      fa: `<i class="fa-brands fa-html5"></i>`,
      title: 'HTML/CSS',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-brands fa-square-js"></i>`,
      title: 'JS/JQ/React',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-brands fa-php"></i>`,
      title: 'PHP/Wordpress',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-brands fa-gulp"></i>`,
      title: 'Gulp/Drunt',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-solid fa-server"></i>`,
      title: 'REST_API',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-brands fa-sass"></i>`,
      title: 'Sass/Less',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-brands fa-git-alt"></i>`,
      title: 'Git',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
  ],
  Soft: [
    {
      fa: `<i class="fa-solid fa-hand-peace"></i>`,
      title: 'Friendliness',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-solid fa-shield-halved"></i>`,
      title: 'Responsible',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-solid fa-bed"></i>`,
      title: 'A bit lazy',
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.SKILLS,
      type: TYPES.MENU,
    },
  ],
  Experiene: [
    {
      title: 'Frontend engineer. Mencodehard. (Remotely) NOW',
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
    {
      title: 'Junior/Trainee Frontend developer. WebLoveMe. Dnipro. 2021-2022',
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
  ],
  Hobbies: [
    {
      fa: `<i class="fa-solid fa-music"></i>`,
      title: 'Music_Creating',
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-solid fa-plane"></i>`,
      title: 'Traveling',
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-solid fa-gamepad"></i>`,
      title: 'Video-games',
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
    {
      fa: `<i class="fa-solid fa-person-biking"></i>`,
      title: 'Cycling',
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
    {
      title: MENU.BACK,
      id: MENU.ABOUT,
      type: TYPES.MENU,
    },
  ],
};

export const themes = ['green', 'blue', 'yellow', 'pink', 'neon'];
