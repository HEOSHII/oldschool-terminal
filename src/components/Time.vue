<script setup>

import { reactive, onMounted, onUnmounted } from 'vue';

const time = reactive({current: new Date()});

onMounted(() => { const timeUpdater = setInterval(() => time.current = new Date(), 1000); });

onUnmounted(() => clearInterval(timeUpdater));

</script>

<template>
  <div class="flex absolute top-5 right-10 text-xl">
    <span>{{ time.current.getHours() < 10 ? '0' + time.current.getHours() : time.current.getHours() }}</span>
    <span>:</span>
    <span>{{ time.current.getMinutes() < 10 ? '0' + time.current.getMinutes() : time.current.getMinutes() }}</span>
    <span>:</span>
    <span>{{ time.current.getSeconds() < 10 ? '0' + time.current.getSeconds() : time.current.getSeconds() }}</span>
  </div>
</template>