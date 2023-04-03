<script setup>

import { reactive, onMounted, onUnmounted } from 'vue';
import keyboardListener from '../utils/functions/keyboardListener'

const input = reactive({ value: '', history: [], searchIndex: -1, caretIndex: -1, busy: false });

const { callCommand } = defineProps(['callCommand']);

const terminalInput = event => {
  event.preventDefault();
  keyboardListener(event.key, input, callCommand)
}

onMounted(() => document.addEventListener('keydown', terminalInput));
onUnmounted(() => document.removeEventListener('keydown', terminalInput));

</script>

<template>
  <div
    class="animate-text-stereo fixed flex items-center bottom-0 left-0 right-0 bg-[#000000b0] backdrop-blur-lg px-1 py-4 text-3xl text-terminal-green-primary">
    <span class="mr-4">
      >
    </span>
    <div class="flex">
      <p v-for="(char, index) in input.value.split('')"
        :class="index === input.caretIndex && 'bg-terminal-green-primary text-terminal-green-dark animate-pulse'">
        {{ char === ' ' ? '&ensp;' : char }}
      </p>
    </div>

    <span v-if="input.caretIndex === -1"
      class="animate-pulse bg-terminal-green-primary text-terminal-green-dark">&ensp;</span>
  </div>
</template>