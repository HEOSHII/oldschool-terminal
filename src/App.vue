<script setup>
import { ref, reactive, onMounted } from 'vue';
import Time from './components/Time.vue'
import Input from './components/Input.vue'
import Display from './components/Display.vue'
import { content } from './utils/variables';
import { runCommand } from './utils/functions'

const render = reactive({ content:[content.init] });

const terminalLoaded = ref(false);
onMounted(() => setTimeout(() => terminalLoaded.value = true, 2000));

</script>


<template>
  <main class="terminal-screen pb-20 overflow-hidden flex items-center relative text-terminal-green-primary bg-gradient-radial from-terminal-green-dark to-black h-screen animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving">
    <Display :display="render"  />
    <Time />
  </main>
  <Input v-if="terminalLoaded" :callCommand="command => runCommand(command, render)"/>
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
