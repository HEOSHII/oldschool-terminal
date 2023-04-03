<script setup>
import { reactive, watch } from 'vue';
import Input from './components/Input.vue'
import FakeInput from './components/FakeInput.vue'
import Display from './components/Display.vue'
import Header from './components/Header.vue'
import StartingPage from './components/StartingPage.vue';
import { content, atmosAudio } from './utils/data';
import runCommand from './utils/functions/runCommand'

const display = reactive({ content: [content.init], isTerminalBusy: false, inChat: false, isTerminal: false });

const startTerminal = () => display.isTerminal = true;

watch(() => display.isTerminal, () => atmosAudio.play());

</script>

<template>
  <StartingPage v-if="!display.isTerminal" :terminal="terminal" @startTerminal="startTerminal" />
  <main v-if="display.isTerminal"
    class="terminal-screen overflow-hidden flex items-center relative text-terminal-green-primary bg-black bg-gradient-radial from-terminal-green-dark to-black h-screen animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving">
    <Header />
    <Display :content="display.content" :display="display" @callCommand="command => runCommand(command, display)" />
    <Input :callCommand="command => runCommand(command, display)" />
    <p v-if="display.inChat" class="absolute bg-[#000000b0] backdrop-blur-lg p-10 top-40 right-40 text-3xl test-center">
      You in chat with Open AI. <br>Enter <span
        class=" cursor-pointer hover:bg-terminal-green-primary hover:text-terminal-green-dark"
        @click="() => runCommand('exit chat', display)">EXIT CHAT</span> for leave
    </p>
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
