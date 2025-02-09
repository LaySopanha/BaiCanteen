<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';

const auth = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);
const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const navigateToPortal = () => {
  const path = auth.userRole === 'vendor' ? '/vendor/dashboard' : '/student/menu';
  router.push(path);
  showDropdown.value = false;
};

const navigateToHome = () => {
  router.push('/');
  showDropdown.value = false;
};

const handleLogout = async () => {
  await auth.logout();
  router.push('/auth');
  showDropdown.value = false;
};
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="showDropdown = !showDropdown"
      class="flex items-center space-x-2 focus:outline-none"
    >
      <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
        {{ auth.getUserName.charAt(0).toUpperCase() }}
      </div>
      <span class="hidden md:block text-sm">{{ auth.getUserName }}</span>
      <i class="pi pi-chevron-down text-xs"></i>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
    >
      <div class="px-4 py-2 text-xs text-gray-500">
        Signed in as<br>
        <span class="font-medium text-gray-900">{{ auth.getUserName }}</span>
      </div>
      
      <div class="border-t border-gray-100"></div>

      <button
        @click="navigateToPortal"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <i class="pi pi-th-large mr-2"></i>
        Go to Portal
      </button>

      <button
        @click="navigateToHome"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <i class="pi pi-home mr-2"></i>
        Landing Page
      </button>

      <div class="border-t border-gray-100"></div>

      <button
        @click="handleLogout"
        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        <i class="pi pi-sign-out mr-2"></i>
        Sign out
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>