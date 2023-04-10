<script setup>
import Time from './Time.vue'

const { inChat, admin } = defineProps(['inChat', 'admin']);

</script>

<template>
  <header class="fixed top-0 left-0 b w-full py-4 bg-[#000000b0] backdrop-blur-lg text-terminal-main-primary">
    <div class="flex justify-between items-center px-10">
      <a href="/" class="text-3xl">Terminal<span class="animate-pulse">_</span></a>
      <marquee class="bg-terminal-main-primary text-terminal-main-dark flex items-center" width="500" height="35"
        scrolldelay="1" behavior="scroll" direction="left">
        <p class="text-2xl" v-if="inChat">
          You in chat with Open AI. You can ask anything you want and Open AI will answer to you. Enter
          EXIT for leave chat</p>
      </marquee>
      <p v-if="admin">Admin</p>
      <Time />
    </div>
  </header>
</template>