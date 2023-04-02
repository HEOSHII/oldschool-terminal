<script setup>
import { ref, reactive, onMounted } from 'vue';
import Input from './components/Input.vue'
import Display from './components/Display.vue'
import Header from './components/Header.vue'
import { content } from './utils/data';
import { runCommand } from './utils/functions'

const display = reactive({ content: [content.init] });

const terminal = ref(false);

onMounted(() => setTimeout(() => terminal.value = true, 1000));

</script>

<template>
  <main
    class="terminal-screen overflow-hidden flex items-center relative text-terminal-green-primary bg-gradient-radial from-terminal-green-dark to-black h-screen animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving">
    <Header />
    <Display :display="display" @callCommand="command => runCommand(command, display)" />
    <Input v-if="terminal" @test="onTest" :callCommand="command => runCommand(command, display)" />
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
