<script setup>
import VendorNavBar from '@/components//VendorNavbar.vue';
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <VendorNavBar />
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>