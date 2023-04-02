<script setup>

import { reactive, onMounted, onUnmounted } from 'vue';
import {keyboardListener} from '../utils/functions'

const input = reactive({value: '', history: [], searchIndex: -1, caretIndex: -1});

const {callCommand} = defineProps(['callCommand']);

onMounted(() => document.addEventListener('keydown', (event) => {
  event.preventDefault();
  keyboardListener(event.key, input, callCommand)
}));
onUnmounted(() => document.removeEventListener('keydown', keyboardListener));

</script>

<template>
  <div class="animate-text-stereo fixed flex items-center bottom-0 left-0 right-0 bg-[#000000dc] backdrop-blur-sm px-1 py-4 text-3xl text-terminal-green-primary">
    <span class="mr-4">
      >
    </span>
    <div class="flex">
      <p v-for="(char, index) in input.value.split('')" :class="index === input.caretIndex && 'bg-terminal-green-primary text-terminal-green-dark'">
        {{ char === ' ' ? '&ensp;' : char   }}
      </p>
    </div>

    <span v-if="input.caretIndex === -1" class="bg-terminal-green-primary text-terminal-green-dark">&ensp;</span>
  </div>
</template>