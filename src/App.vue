<script setup>
import { ref, watch, reactive, onMounted, onUnmounted } from 'vue';
import Time from './components/Time.vue'
import Input from './components/Input.vue'
import { commands, content } from './utils/variables';

const key = ref(0);
const render = reactive({ content:{} });

const doCommand = command => {
  if(!Object.keys(commands).filter(key => key === command).length) {
    render.content = {...content.default, title: content.default.title + ": " + command};
    return;
  }
  if(Object.keys(content[command]).includes('file')) {
    const fileLink = document.createElement('a');
    fileLink.href = content[command].file;
    fileLink.setAttribute('download', content[command].fileName);
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
  }
  render.content = content[command];
};

watch(() => render.content, ()=>key.value++);
</script>


<template>
  <main class=" terminal-screen overflow-hidden flex items-center relative text-terminal-green-primary bg-gradient-radial from-terminal-green-dark to-black h-screen animate-text-stereo before:bg-lines before:bg-line after:animate-line-moving">
    <div :key="key" class="p-10">
      <VueWriter class="text-5xl" :array="[render.content.title ?? '']" :typeSpeed="10" :iterations='1'/>
      <hr class="my-3">
      <ul class="text-2xl">
        <li v-for="(line, index) in render.content.lines">
          <VueWriter :array="[line ?? '']" :start="200 + index * 500" :typeSpeed="10" :iterations='1'/>
        </li>  
      </ul>
    </div>
    <Time />
  </main>
  <Input :doCommand="doCommand"/>
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
