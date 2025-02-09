<script setup>
import { defineProps } from 'vue';
defineProps({
  bgColor:{
    type: String,
    default: "bg-white"
  }
});
</script>

<template>
  <section :class="[bgColor, 'pt-20 pb-20 mb-20']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center ">
        <div class="w-full sm:w-full">
            <slot name="top"></slot>
        </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center">
        <div class="w-full  sm:w-1/2">
            <slot name="left"></slot>
        </div>
        <div class="w-full sm:w-1/2">
            <slot name="right"></slot>
        </div>
    </div>
  </section>
</template>
