<script setup>
import Time from './Time.vue'

</script>

<template>
  <header class="fixed top-0 w-full py-4 bg-[#000000b0] backdrop-blur-lg">
    <div class="flex justify-between items-center px-10">
      <a href="/" class="text-4xl">Terminal<span class="animate-pulse">_</span></a>
      <Time />
    </div>
  </header>
</template>