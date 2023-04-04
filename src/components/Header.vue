<script setup>
import Time from './Time.vue'

const { inChat } = defineProps(['inChat']);

</script>

<template>
  <header class="fixed top-0 w-full py-4 bg-[#000000b0] backdrop-blur-lg">
    <div class="flex justify-between items-center px-10">
      <a href="/" class="text-3xl">Terminal<span class="animate-pulse">_</span></a>
      <marquee class="text-xl" v-if="inChat" width="500" scrolldelay="1" behavior="scroll" direction="left">
        You in chat with Open AI. You can ask anything you want and Open AI will answer to you. Enter
        EXIT CHAT for leave
      </marquee>
      <Time />
    </div>
  </header>
</template>