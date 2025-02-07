
<script setup>
import VerticalNavBar from '@/components/VerticalNavBar.vue';
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar for portal navigation -->
    <VerticalNavBar />

    <!-- Main portal content -->
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>