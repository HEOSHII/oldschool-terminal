<script setup>
import { onMounted, onUnmounted } from 'vue';

const { terminal } = defineProps(['terminal']);
const emit = defineEmits(['startTerminal']);

const enterListener = ({ key }) => {
  if (key === 'Enter') {
    emit('startTerminal');
  }
}

onMounted(() => document.addEventListener('keydown', enterListener));
onUnmounted(() => document.removeEventListener('keydown', enterListener));
</script>

<template>
  <div class=" bg-black text-white w-screen h-screen flex flex-col justify-center items-center">
    <p class="text-4xl text-red uppercase mb-14">Warning!</p>
    <p class="text-5xl mb-6">This web-app can play <span class="animate-text-stereo">sounds</span></p>
    <p class="text-3xl max-w-lg text-center mb-14">
      By default sounds are turned OFF but you always can turn it ON from the terminal
    </p>
    <p class="text-2xl animate-pulse underline"> Press
      <span class="text-terminal-green-primary">ENTER</span>
      to get started
    </p>
  </div>
</template>