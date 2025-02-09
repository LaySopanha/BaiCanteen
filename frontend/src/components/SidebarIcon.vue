<script setup>
import { defineProps } from 'vue';

defineProps({
  icon: {
    type: String,
    default: "pi pi-info-circle"
  }
});
</script>

<template> 
    <div class="sidebar-icon">
      <i :class="icon"></i>
    </div>
</template>