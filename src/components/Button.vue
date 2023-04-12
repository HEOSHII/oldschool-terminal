<script setup>
const { active } = defineProps(['active']);
</script>

<template>
  <button class="flex items-center space-x-4 min-w-[100px]">
    <div
      :class="`w-full relative rounded-full bg-[#6d6d6d] p-3 flex justify-center items-center font-sans text-sm shadow-button after:absolute after:z-[-1] after:bg-[#111213]  after:rounded-full after:top-[-1px] after:left-[-3px] after:w-[calc(100%_+_6px)] after:h-[calc(100%_+_6px)] after:block after:shadow-buttonAfter active:shadow-buttonActive active:top-[2px] active:after:top-[-3px] ${active && 'after:bg-[var(--terminal-main)] after:shadow-[0_0_20px_1px_var(--terminal-main)]'} `">
      <p
        :class="`${active ? ' text-terminal-main-primary drop-shadow-[0_0_2px_var(--terminal-main)]' : 'text-[rgb(17,18,19)]'}`">
        <slot></slot>
      </p>
    </div>
  </button>
</template>