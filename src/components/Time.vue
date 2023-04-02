<script setup>

import { reactive, onMounted, onUnmounted } from 'vue';

const time = reactive({ current: new Date() });

onMounted(() => { const timeUpdater = setInterval(() => time.current = new Date(), 1000); });

onUnmounted(() => clearInterval(timeUpdater));

</script>

<template>
  <div class="text-2xl">
    <span>{{ time.current.getHours() < 10 ? '0' + time.current.getHours() : time.current.getHours() }}</span>
    <span class="animate-pulse">:</span>
    <span>{{ time.current.getMinutes() < 10 ? '0' + time.current.getMinutes() : time.current.getMinutes() }}</span>
  </div>
</template>