<script setup>
const { display } = defineProps(['display']);
</script>

<template>
  <div
    :class="`terminal-screen max-w-[1200px] max-h-[calc(100%_-_5px)] mr-10 w-full h-full border-4 border-[#121212] shadow-[inset_0_0_3px_3px_#000000_,_0_0_3px_2px_#000000] rounded-[50px] transition-colors overflow-hidden flex items-center relative text-terminal-main-primary bg-black ${display.isStarted && 'bg-gradient-radial from-terminal-main-dark to-black animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving'}`">
    <slot></slot>
    <div
      class="absolute top-4 right-1/2 translate-x-1/2 w-[calc(100%_-_50px)] h-3/4 pointer-events-none opacity-10 blur-lg rounded-3xl bg-gradient-to-b from-white to-transparent ">
    </div>
    <div class="absolute top-24 right-44 w-7 pointer-events-none h-56 blur-3xl opacity-50 rounded-2xl bg-white ">
    </div>
  </div>
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