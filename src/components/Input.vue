<script setup>

import { reactive, onMounted, onUnmounted } from 'vue';
import keyboardListener from '../utils/functions/keyboardListener'
import runCommand from '../utils/functions/runCommand';
import Loader from './Loader.vue';

const input = reactive({ value: '', history: [], searchIndex: -1, caretIndex: -1 });

const { callCommand, display } = defineProps(['callCommand', 'display']);

const terminalInput = event => {
  event.preventDefault();
  keyboardListener(event.key, input, callCommand, display)
}

const specialListener = event => {
  switch (event.key) {
    case ' ':
    case 'Tab':
    case 'ArrowDown':
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'Backspace':
    case 'Delete':
      event.preventDefault();
      keyboardListener(event.key, input, callCommand, display)
      break;
  }
}

onMounted(() => {
  addEventListener('keydown', specialListener)
  addEventListener('keypress', terminalInput)
});
onUnmounted(() => {
  removeEventListener('keydown', specialListener)
  removeEventListener('keypress', terminalInput)
});

</script>

<template>
  <Loader v-if="display.busy" />
  <div :style="display.busy && 'bottom: -100%'"
    class="animate-text-stereo fixed flex items-center bottom-0 left-0 right-0 bg-[#000000b0] backdrop-blur-lg px-1 py-4 text-3xl text-terminal-main-primary transition-[bottom] duration-500 ">
    <span class="mr-4 ml-4">
      >
    </span>
    <div class="flex max-w-[80%] flex-wrap">
      <p v-if="input.caretIndex >= 0" v-for="(char, index) in input.value.split('')"
        :class="index === input.caretIndex && 'bg-terminal-main-primary text-terminal-main-dark animate-pulse'">
        {{ char === ' ' ? '&ensp;' : char }}
      </p>
      <p v-else class="w-full break-words">
        {{ input.value }}<span
          class="animate-pulse bg-terminal-main-primary text-terminal-main-dark break-words max-w-full">&ensp;</span>
      </p>
    </div>

    <button v-if="display.inChat"
      class="absolute uppercase right-10 hover:bg-terminal-main-primary hover:text-terminal-main-dark px-2"
      @click="() => runCommand('exit', display)">exit</button>
  </div>
</template>