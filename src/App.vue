<script setup>
import { ref, reactive } from 'vue';
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo iure nesciunt debitis exercitationem? Minima eum deserunt, repudiandae beatae suscipit, voluptates molestiae non nam quaerat eos quam facere ipsam eaque!';

const renderText = ref('');

const typing = (text, ref, delay) => {
  text.split('').forEach((char, index) => {
    setTimeout(() => {
      ref.value = ref.value + char;
    }, index * delay);
  });
}

typing(text, renderText, 50);



</script>


<template>
  <main class="terminal-screen flex items-center relative p-1 text-terminal-green-primary bg-gradient-radial from-terminal-green-dark to-black h-screen animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving">
    
    <div class="p-2 max-w-xl w-full mx-auto border">
      <p class="text-4xl">{{ renderText }}</p>
    </div>

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
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(255, 255, 255, 0.01));
    pointer-events: none;
  }
</style>
