export const sounds = {
  keyboard: [
    new Audio('../assets/sounds/keyboard/keys_1.mp3'),
    new Audio('../assets/sounds/keyboard/keys_2.mp3'),
    new Audio('../assets/sounds/keyboard/keys_3.mp3'),
    new Audio('../assets/sounds/keyboard/keys_4.mp3'),
    new Audio('../assets/sounds/keyboard/keys_5.mp3'),
    new Audio('../assets/sounds/keyboard/keys_6.mp3'),
    new Audio('../assets/sounds/keyboard/keys_7.mp3'),
    new Audio('../assets/sounds/keyboard/keys_8.mp3'),
    new Audio('../assets/sounds/keyboard/keys_9.mp3'),
    new Audio('../assets/sounds/keyboard/keys_10.mp3'),
    new Audio('../assets/sounds/keyboard/keys_11.mp3'),
    new Audio('../assets/sounds/keyboard/keys_12.mp3'),
  ],

  comp: {
    atmos: new Audio('../assets/sounds/comp/atmos.mp3'),
    enter: new Audio('../assets/sounds/keyboard/keys_start.mp3'),
    transition: new Audio('../assets/sounds/comp/transition.mp3'),
    error: new Audio('../assets/sounds/comp/error.mp3'),
    theme: [
      new Audio('../assets/sounds/comp/theme.mp3'),
      new Audio('../assets/sounds/comp/theme_2.mp3'),
      new Audio('../assets/sounds/comp/theme_3.mp3'),
      new Audio('../assets/sounds/comp/theme_4.mp3'),
      new Audio('../assets/sounds/comp/theme_5.mp3'),
    ],
  },

  playRandomKeyboardSound() {
    this.keyboard[Math.floor(Math.random() * this.keyboard.length)].play();
  },

  playTransitionSound() {
    this.comp.transition.play();
  },

  playEnterSound() {
    this.comp.enter.play();
  },

  playCompAtmosLoop() {
    this.comp.atmos.setAttribute('loop', 'loop');
    this.comp.atmos.play();
  },

  playThemeChangeSound() {
    this.comp.theme[Math.floor(Math.random() * this.comp.theme.length)].play();
  },

  playErrorSound() {
    this.comp.error.play();
  },
};
