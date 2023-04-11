<script setup>
const { active } = defineProps(['active']);
</script>

<template>
  <button class="flex items-center space-x-4">
    <div
      class="relative rounded-full bg-[#6d6d6d] p-3 flex justify-center items-center font-sans text-sm shadow-button after:absolute after:z-[-2] after:bg-[rgb(17,18,19)]  after:rounded-full after:top-[-1px] after:left-[-3px] after:w-[calc(100%_+_6px)] after:h-[calc(100%_+_6px)] after:block after:shadow-buttonAfter active:shadow-buttonActive active:top-[2px] active:after:top-[-3px]">
      <p :class="`${active ? 'text-white drop-shadow-[0_0_2px_#ffffff]' : 'text-[rgb(17,18,19)]'} `">
        <slot></slot>
      </p>
    </div>
    <div
      :class="`rounded-md w-2 h-2 border-[0.5px] shadow-[0_0_10px_5px] ${!active ? 'border-[#ffbdbd71] bg-[#ff5c5c]  shadow-[#ff56566e]' : 'border-[#c2ffbd71] bg-[#64ff5c]  shadow-[#56ff5c6e]'}`">
    </div>
  </button>
</template>