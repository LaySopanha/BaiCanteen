<script setup>
import Navbar from '@/components/Navbar.vue';
import { RouterView, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authentication';

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Check authentication status on app load
  if (!auth.checkAuth() && !router.currentRoute.value.path.includes('auth')) {
    router.push('/auth');
  }
});
</script>

<template>
  <Navbar />
  <RouterView/>
</template>

