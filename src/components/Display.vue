<script setup>
import { ref, defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue';

const terminalHistory = ref(null);

const { display } = defineProps(['display']);
const emit = defineEmits(['callCommand']);

let scrollingDown = false;
const handleScroll = () => {
  clearInterval(scrollingDown)
  scrollingDown = false;
};

watch(() => display.content, () => {
  if (!scrollingDown) {
    scrollingDown = setInterval(() => terminalHistory.value.scrollTop = terminalHistory.value.scrollHeight, 0)
  }
});
onMounted(() => terminalHistory.value.addEventListener('wheel', handleScroll));
onUnmounted(() => terminalHistory.value.removeEventListener('wheel', handleScroll));

</script>

<template>
  <div ref="terminalHistory" class="py-20 px-10 h-full w-full overflow-y-scroll">
    <div class="flex flex-col justify-end min-h-full">
      <div v-for="(content, index) in display.content" :class="index + 1 !== display.content.length && 'mb-10'">
        <VueWriter class="text-4xl underline mb-2" :array="[content.title ?? '']" :typeSpeed="10" :iterations='1' />
        <ul class="text-3xl pl-2 flex flex-col text-left">
          <li class="mb-2" v-for="(line, index) in content.lines">
            <VueWriter :array="[line]" :start="index * 300" :typeSpeed="10" :iterations='1' />
          </li>
          <a class="block hover:bg-terminal-green-primary hover:text-terminal-green-dark"
            v-for="({ name, url, action }, index) in content.links" :href="action + `${url}`" target="_blank">
            <VueWriter :array="[name + ': ' + url]" :start="index * 300" :typeSpeed="10" :iterations='1' />
          </a>
          <button v-for="(command, index) in content.commands"
            class="text-left animate-text-stereo hover:bg-terminal-green-primary hover:text-terminal-green-dark"
            @click="(() => emit('callCommand', command))">
            <VueWriter class=" pointer-events-none" :array="['> ' + command]" :start="index * 300" :typeSpeed="10"
              :iterations='1' />
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>