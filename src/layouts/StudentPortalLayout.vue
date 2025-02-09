<script setup>
import StudentNavBar from '@/components//StudentNavBar.vue';
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <StudentNavBar />
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>