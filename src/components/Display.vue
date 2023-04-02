<script setup>
const {display} = defineProps(['display']);

</script>

<template>
  <div class="p-10 h-full flex flex-col justify-end">
    <div v-for="(contents, index) in display.content" :class="index + 1 !== display.content.length && 'mb-10'">
      <VueWriter class="text-5xl underline mb-2" :array="[contents.title ?? '']" :typeSpeed="10" :iterations='1'/>
      <ul class="text-3xl pl-2">
        <li v-for="(line, index) in contents.lines">
          <VueWriter :array="[line ?? '']" :start="index * 300" :typeSpeed="10" :iterations='1'/>
        </li>
      </ul>
    </div>
  </div>
</template>