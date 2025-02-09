<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authentication';
import StudentNavBar from '@/components/StudentNavBar.vue';
import VendorNavBar from '@/components/VendorNavbar.vue';

const auth = useAuthStore();
const isVendor = computed(() => auth.isVendor);
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Conditional Navigation based on role -->
    <StudentNavBar v-if="!isVendor" />
    <VendorNavBar v-else />

    <!-- Main Content Area -->
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>