<script setup>
import Time from './Time.vue'


</script>

<template>
  <header class="fixed top-0 w-full py-4 bg-[#000000ce] backdrop-blur-sm">
    <div class="flex justify-between items-center px-10">
      <p class="text-4xl">Terminal<span class="animate-pulse">_</span></p>
      <Time />
    </div>
  </header>
</template>