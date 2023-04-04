<script setup>


import inputNormalize from '../utils/functions/inputNormalize';
import runCommand from '../utils/functions/runCommand';

const { display } = defineProps(['display']);
const mobileFormSubmit = event => {
  event.preventDefault();
  const command = inputNormalize(display.mobileInput);
  console.log(command);
  runCommand(command, display);
  display.mobileInput = '';
}


</script>

<template>
  <form @submit="mobileFormSubmit"
    class="animate-text-stereo fixed flex items-center bottom-0 left-0 right-0 bg-[#000000b0] backdrop-blur-lg px-5 py-4 text-3xl text-terminal-green-primary focus:bottom-6">
    <span>></span>
    <input class="bg-transparent focus:outline-none ml-5 w-[80%]" type="text" v-model="display.mobileInput">
  </form>
</template>