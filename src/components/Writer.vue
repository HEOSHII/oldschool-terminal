<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import playRandomKeyboardSound from "../utils/functions/playRandomKeyboardSound";

const { text, typeSpeed, start } = defineProps(['text', 'typeSpeed', 'start']);
const writer = reactive({ typeValue: '', charIndex: 0 });

const typewriter = () => {
  if (writer.charIndex >= text.length) {
    return;
  }
  playRandomKeyboardSound();
  writer.typeValue += text.charAt(writer.charIndex);
  writer.charIndex++;
  setTimeout(typewriter, typeSpeed);
}

let startWriting;
onMounted(() => startWriting = setTimeout(typewriter, start));
onUnmounted(() => clearTimeout(startWriting));

</script>

<template>
  <p>{{ writer.typeValue }}</p>
</template>
