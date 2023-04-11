<script setup>
import { reactive, watch } from 'vue';
import Screen from './components/Screen.vue'
import Display from './components/Display.vue'
import Header from './components/Header.vue'
import Loader from './components/Loader.vue';
import Button from './components/Button.vue';
import { atmosAudio } from './utils/sound';
import runCommand from './utils/functions/runCommand'
import { THEMES } from './utils/constants';

const display = reactive({
  content: [],
  inChat: false,
  isStarted: false,
  busy: false,
  theme: THEMES.GREEN,
  sound: false
});

watch(() => display.isStarted, () => {
  if (display.isStarted && display.sound) {
    atmosAudio.volume = 0.25;
    atmosAudio.currentTime = 0;
    atmosAudio.play();
    return;
  }
  display.inChat = false;
  display.content = [];
  atmosAudio.pause();
});

watch(() => display.sound, () => {
  if (display.isStarted && display.sound) {
    atmosAudio.volume = 0.25;
    atmosAudio.currentTime = 0;
    atmosAudio.play();
    return;
  }
  atmosAudio.pause();
});

</script>

<template>
  <main class="p-10 h-screen w-screen bg-[#1c1c1c] bg-small bg-center drop-shadow-lg flex justify-center items-center"
    :data-theme="display.theme">
    <Screen
      :class="`terminal-screen max-w-6xl max-h-[calc(100%_-_100px)] w-full h-full border-8 mx-auto my-auto border-[#121212] shadow-[inset_0_0_3px_3px_#000000] rounded-2xl transition-colors overflow-hidden flex items-center relative text-terminal-main-primary bg-black ${display.isStarted && 'bg-gradient-radial from-terminal-main-dark to-black animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving'} `">
      <Display v-if="display.isStarted" :display="display" @callCommand="command => runCommand(command, display)" />
    </Screen>
    <div class="flex flex-col space-y-4 absolute top-1/2 right-10">
      <Button @click="() => display.isStarted = !display.isStarted" :active="display.isStarted">
        POWER
      </Button>
      <Button @click="() => display.sound = !display.sound" :active="display.sound">
        SOUND
      </Button>
    </div>

    <Loader v-if="display.busy" />
  </main>
</template>

<style scoped>
.terminal-screen::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  pointer-events: none;
}

.terminal-screen::after {
  content: '';
  position: absolute;
  left: 0;
  top: -100%;
  right: 0;
  bottom: 0;
  height: 50%;
  width: 100%;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.01));
  pointer-events: none;
}
</style>
