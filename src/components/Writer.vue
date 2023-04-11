<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import playRandomKeyboardSound from "../utils/functions/playRandomKeyboardSound";

const { text, typeSpeed, sound } = defineProps(['text', 'typeSpeed', 'sound']);
const writer = reactive({ typeValue: '', charIndex: 0 });

const typewriter = () => {
  if (writer.charIndex >= text.length) {
    return;
  }
  sound && playRandomKeyboardSound();
  writer.typeValue += text.charAt(writer.charIndex);
  writer.charIndex++;
  setTimeout(typewriter, typeSpeed);
}

onMounted(typewriter);

</script>

<template>
  <p class="leading-none  whitespace-break-spaces text-2xl">{{ writer.typeValue }}</p>
</template>
