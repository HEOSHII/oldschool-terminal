<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import playRandomKeyboardSound from "../utils/functions/playRandomKeyboardSound";

const { text, typeSpeed, start } = defineProps(['text', 'typeSpeed', 'start']);
const writer = reactive({ typeValue: '', charIndex: 0, sound: false });

const typewriter = () => {
  writer.sound = writer.charIndex === 0;
  if (writer.charIndex >= text.length) {
    return;
  }
  playRandomKeyboardSound(writer);
  writer.typeValue += text.charAt(writer.charIndex);
  writer.charIndex++;
  setTimeout(typewriter, typeSpeed);
}

let startWriting;
onMounted(() => startWriting = setTimeout(typewriter, start));
onUnmounted(() => clearTimeout(startWriting));

</script>

<template>
  <p class="leading-none  whitespace-break-spaces text-2xl">{{ writer.typeValue }}</p>
</template>
