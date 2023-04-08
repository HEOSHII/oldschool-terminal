<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Writer from './Writer.vue'

const terminalHistory = ref(null);

const { display } = defineProps(['display']);

const emit = defineEmits(['callCommand']);

let scrollingDown = false;
const handleScroll = () => {
  clearInterval(scrollingDown)
  scrollingDown = false;
};

watch(
  () => display.content,
  () => {
    if (!scrollingDown) {
      scrollingDown = setInterval(() => terminalHistory.value.scrollTop = terminalHistory.value.scrollHeight, 0)
    }
  }, { deep: true });

onMounted(() => terminalHistory.value.addEventListener('wheel', handleScroll));
onUnmounted(() => terminalHistory.value.removeEventListener('wheel', handleScroll));

</script>

<template>
  <div ref="terminalHistory" class="py-20 px-10 h-full w-full overflow-y-scroll">
    <div class="flex flex-col justify-end min-h-full">
      <div v-for="({ title, lines, links, commands, image }, index) in display.content"
        :class="index + 1 < display.content.length && 'mb-10'">
        <Writer class="text-4xl underline mb-2" :text="title" :typeSpeed="5" />
        <ul :class="`text-3xl pl-2 flex flex-col text-left`">
          <li class="mb-2 text-2xl" v-for="(line, index) in lines">
            <Writer :text="line" :typeSpeed="5" />
          </li>
          <a class="block hover:bg-terminal-main-primary hover:text-terminal-main-dark"
            v-for="({ name, url, action }, index) in links" :href="`${action + url}`" target="_blank">
            <Writer :text="name + ': ' + url" :typeSpeed="5" />
          </a>
          <button v-for="(command, index) in commands"
            class="text-left animate-text-stereo hover:bg-terminal-main-primary hover:text-terminal-main-dark"
            @click="(() => emit('callCommand', command))">
            <Writer class=" pointer-events-none" :text="'> ' + command" :typeSpeed="5" />
          </button>
          <div v-if="image" class="w-64 h-64">
            <img class="w-full h-full object-cover" :src="image" alt="Answer">
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>