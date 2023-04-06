<script setup>

import { reactive, onMounted, onUnmounted } from 'vue';
import keyboardListener from '../utils/functions/keyboardListener'
import runCommand from '../utils/functions/runCommand';
import Loader from './Loader.vue'

const input = reactive({ value: '', history: [], searchIndex: -1, caretIndex: -1 });

const { callCommand, display } = defineProps(['callCommand', 'display']);

const terminalInput = event => {
  event.preventDefault();
  keyboardListener(event.key, input, callCommand, display)
}

onMounted(() => document.addEventListener('keydown', terminalInput));
onUnmounted(() => document.removeEventListener('keydown', terminalInput));

</script>

<template>
  <Loader v-if="display.busy" />
  <div :style="display.busy && 'bottom: -100%'"
    class="animate-text-stereo fixed flex items-center bottom-0 left-0 right-0 bg-[#000000b0] backdrop-blur-lg px-1 py-4 text-3xl text-terminal-green-primary transition-[bottom] duration-500 ">
    <span class="mr-4">
      >
    </span>
    <div class="flex max-w-[80%] flex-wrap">
      <p v-if="input.caretIndex >= 0" v-for="(char, index) in input.value.split('')"
        :class="index === input.caretIndex && 'bg-terminal-green-primary text-terminal-green-dark animate-pulse'">
        {{ char === ' ' ? '&ensp;' : char }}
      </p>
      <p v-else class="w-full break-words">
        {{ input.value }}<span
          class="animate-pulse bg-terminal-green-primary text-terminal-green-dark break-words max-w-full">&ensp;</span>
      </p>
    </div>

    <button v-if="display.inChat"
      class="absolute uppercase right-10 hover:bg-terminal-green-primary hover:text-terminal-green-dark px-2"
      @click="() => runCommand('exit chat', display)">exit
      chat</button>
  </div>
</template>