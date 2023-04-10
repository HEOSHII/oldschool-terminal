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
  <div ref="terminalHistory" class="py-5 px-5 h-full w-full overflow-y-scroll ">
    <div class="flex flex-col justify-end min-h-full ">
      <div v-for="({ title, lines, links, commands }) in display.content">
        <ul class="pl-2 flex flex-col text-left mb-2">
          <li v-if="title">
            <Writer :text="title" :typeSpeed="5" />
          </li>
          <li class="ml-2" v-if="lines" v-for="line in lines">
            <Writer :text="line" :typeSpeed="5" />
          </li>
          <li class="ml-2"  v-if="links">
            <a class="block hover:bg-terminal-main-primary hover:text-terminal-main-dark"
              v-for="({ name, url, action }) in links" :href="`${action + url}`" target="_blank">
              <Writer :text="name + ': ' + url" :typeSpeed="5" />
            </a>
          </li>
          <li class="ml-2 flex flex-col"  v-if="commands">
            <button v-for="command in commands"
              class="text-left animate-text-stereo hover:bg-terminal-main-primary hover:text-terminal-main-dark"
              @click="(() => emit('callCommand', command))">
              <Writer class=" pointer-events-none" :text="'> '+command" :typeSpeed="5" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>