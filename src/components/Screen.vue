<template>
  <div>
    <slot></slot>
    <div
      class="absolute top-4 right-1/2 translate-x-1/2 w-[calc(100%_-_50px)] h-3/4 pointer-events-none opacity-10 blur-lg rounded-2xl bg-gradient-to-b from-white to-transparent ">
    </div>
    <div class="absolute top-24 right-44 w-7 pointer-events-none h-56 blur-3xl opacity-50 rounded-2xl bg-white ">
    </div>
  </div>
</template>