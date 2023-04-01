<script setup>

import { reactive, onMounted, onUnmounted } from 'vue';
import {keyboardListener} from '../utils/functions'

const input = reactive({value: '', history: [], searchIndex: -1, caretIndex: -1});

onMounted(() => document.addEventListener('keydown', ({key}) => keyboardListener(key, input)));
onUnmounted(() => document.removeEventListener('keydown', keyboardListener));

</script>

<template>
  <div class="animate-text-stereo border-t fixed flex items-center bottom-0 left-0 right-0 bg-[#00000040] px-1 py-3 text-2xl text-terminal-green-primary">
    <span class="mr-2">></span>
    <div class="flex">
      <p v-for="(char, index) in input.value.split('')" :class="index === input.caretIndex && 'bg-terminal-green-primary text-terminal-green-dark'">
        {{ char !== ' ' ? char : '&ensp;'  }}
      </p>
    </div>

    <span v-if="input.caretIndex === -1" class="bg-terminal-green-primary text-terminal-green-dark">&ensp;</span>
  </div>
</template>