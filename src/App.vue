<script setup>
import { reactive, watch } from 'vue';
import Input from './components/Input.vue'
import Display from './components/Display.vue'
import Header from './components/Header.vue'
import Welcome from './components/Welcome.vue';
import { content, atmosAudio } from './utils/data';
import runCommand from './utils/functions/runCommand'

const display = reactive({ content: [content.init], mobileInput: '', isTerminalBusy: false, inChat: false, isTerminal: false });

const startTerminal = () => display.isTerminal = true;

watch(() => display.isTerminal, () => atmosAudio.play());

</script>

<template>
  <Welcome v-if="!display.isTerminal" :terminal="terminal" @startTerminal="startTerminal" />
  <main v-if="display.isTerminal"
    class="terminal-screen overflow-hidden flex items-center relative text-terminal-green-primary bg-black bg-gradient-radial from-terminal-green-dark to-black h-screen animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving">
    <Header :inChat="display.inChat" />
    <Display :display="display" @callCommand="command => runCommand(command, display)" />
    <Input :display="display" :callCommand="command => runCommand(command, display)" />
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
