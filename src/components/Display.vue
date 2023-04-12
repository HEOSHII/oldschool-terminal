<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Writer from './Writer.vue'
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../utils/firebase/firebase.js';
import Input from '../components/Input.vue'
import runCommand from '../utils/functions/runCommand'

const terminalScreen = ref(null);

const { display } = defineProps(['display']);

const emit = defineEmits(['callCommand']);

const getInitData = async () => {
  try {
    const initRef = doc(db, 'contents', 'init');
    const initSnap = await getDoc(initRef);
    return [initSnap.data()];
  } catch (e) {
    return [{ title: 'Something went wrong', lines: [e, 'Check internet connection', 'Or try again later'] }]
  }
}

watch(
  () => display.content,
  () => {
    const scrolling = setInterval(() => {
      clearInterval(scrolling)
      terminalScreen.value.scrollTop = terminalScreen.value.scrollHeight
    }, 0)
  },
  { deep: true }
);

onMounted(async () => {
  display.content = [];
  display.content = await getInitData()
});


</script>

<template>
  <div ref="terminalScreen" class="h-full w-full overflow-y-scroll relative">
    <div class="flex flex-col justify-end min-h-full px-5 sticky bottom-0 left-0 right-0 py-12">
      <div v-for="({ title, lines, links, commands }) in display.content">
        <ul class="pl-2 flex flex-col text-left mb-2">
          <li v-if="title">
            <Writer :text="title" :typeSpeed="3" :sound="display.sound" />
          </li>
          <li class="ml-2" v-if="lines" v-for="line in lines">
            <Writer :text="line" :typeSpeed="3" :sound="display.sound" />
          </li>
          <li class="ml-2" v-if="links">
            <a class="block hover:bg-terminal-main-primary hover:text-terminal-main-dark"
              v-for="({ name, url, action }) in links" :href="`${action + url}`" target="_blank">
              <Writer :text="name + ': ' + url" :typeSpeed="3" :sound="display.sound" />
            </a>
          </li>
          <li class="ml-2 flex flex-col" v-if="commands">
            <button v-for="command in commands"
              class="text-left animate-text-stereo hover:bg-terminal-main-primary hover:text-terminal-main-dark"
              @click="(() => emit('callCommand', command))">
              <Writer class=" pointer-events-none" :text="'> ' + command" :typeSpeed="3" :sound="display.sound" />
            </button>
          </li>
        </ul>
      </div>
      <Input :display="display" :callCommand="command => runCommand(command, display)" />
    </div>
  </div>
</template>