<script setup>
import { onMounted, reactive, watch } from 'vue';
import Screen from './components/Screen.vue'
import Display from './components/Display.vue'
import Header from './components/Header.vue'
import Loader from './components/Loader.vue';
import Button from './components/Button.vue';
import { atmosAudio } from './utils/sound';
import runCommand from './utils/functions/runCommand'
import { THEMES } from './utils/constants';
import setVolume from './utils/functions/setVolume';

const display = reactive({
  content: [],
  inChat: false,
  isStarted: false,
  busy: false,
  theme: THEMES.DEFAULT,
  sound: false
});

const setSound = () => {
  display.sound = !display.sound;
  setVolume(display.sound ? 0.2 : 0);
}

const reloadPage = () => window.location.reload();

const themeChange = () => {
  const themes = Object.values(THEMES);
  const currentThemeIndex = themes.indexOf(display.theme);
  display.theme = currentThemeIndex === themes.length - 1 ? themes[0] : themes[currentThemeIndex + 1]
}



watch(() => display.isStarted, () => {
  if (!display.isStarted) {
    display.inChat = false;
    display.content = [];
    atmosAudio.pause();
    return;
  }
  atmosAudio.play();
});


</script>

<template>
  <main
    class="p-10 h-screen w-screen bg-[#1c1c1c] bg-metal bg-[100%] bg-[cover] drop-shadow-lg flex justify-center items-center"
    :data-theme="display.theme">
    <Screen :display="display">
      <Display v-if="display.isStarted" :display="display" @callCommand="command => runCommand(command, display)" />
    </Screen>
    <div class="flex flex-col space-y-4 top-1/2 right-10">
      <Button @click="() => display.isStarted = !display.isStarted" :active="display.isStarted">
        POWER
      </Button>
      <Button @click="setSound" :active="display.sound">
        SOUND
      </Button>
      <Button @click="themeChange" class="text-terminal-main-primary">
        THEME
      </Button>
      <p class="p-2 bg-[#1d1d1d] border border-black shadow-buttonAfter animate-text-stereo text-center text-terminal-main-primary">{{ display.theme.toLocaleUpperCase() }}</p>
      <Button @click="reloadPage">
        RESET
      </Button>
    </div>
    <Loader v-if="display.busy" />
  </main>
</template>

