<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const mobileMenuOpen = ref(false);

const menuItems = [
  { path: '/student/menu', icon: 'pi pi-list', label: 'Menu' },
  { path: '/student/vote', icon: 'pi pi-check-circle', label: 'Vote' },
  { path: '/student/results', icon: 'pi pi-chart-bar', label: 'Results' }
];

const handleLogout = () => {
  auth.logout();
  router.push('/auth');
};
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<template>
  <aside class="bg-white">
    <!-- Desktop Sidebar -->
    <div class="hidden md:flex md:w-64 md:flex-col md:min-h-screen">
      <div class="flex flex-col flex-grow border-r border-gray-200 bg-white">

        <!-- User Profile Section -->
        <div class="flex-shrink-0 flex border-b border-gray-200 p-4">
          <div class="flex items-center w-full">
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              {{ auth.getUserName.charAt(0).toUpperCase() }}
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700">{{ auth.getUserName }}</p>
              <p class="text-xs font-medium text-gray-500">Student</p>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 px-3 py-4 space-y-1 bg-white">
          <RouterLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
            :class="route.path === item.path 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-gray-700 hover:bg-green-50 hover:text-primary'"
          >
            <i :class="[item.icon, 'mr-3 text-lg']"></i>
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Logout Button -->
        <div class="flex-shrink-0 p-4 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <i class="pi pi-sign-out mr-2"></i>
            Sign out
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="md:hidden">
      <div class="flex items-center justify-between h-16 px-4 bg-primary">
        <img class="h-8 w-auto" src="@/assets/img/WhiteLogo.png" alt="បាយ-Canteen" />
        <button
          @click="toggleMobileMenu"
          class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <i :class="['pi text-xl', mobileMenuOpen ? 'pi-times' : 'pi-bars']"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="mobileMenuOpen"
        class="border-b border-gray-200 bg-white"
      >
        <!-- Mobile User Profile -->
        <div class="px-4 py-3 bg-gray-50">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              {{ auth.getUserName.charAt(0).toUpperCase() }}
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ auth.getUserName }}</div>
              <div class="text-sm font-medium text-gray-500">Student</div>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <nav class="px-4 py-2 space-y-1">
          <RouterLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-all duration-200"
            :class="route.path === item.path 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-gray-700 hover:bg-green-50 hover:text-primary'"
            @click="closeMobileMenu"
          >
            <i :class="[item.icon, 'mr-3 text-lg']"></i>
            {{ item.label }}
          </RouterLink>

          <!-- Mobile Logout Button -->
          <button
            @click="handleLogout"
            class="flex items-center w-full px-3 py-2.5 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <i class="pi pi-sign-out mr-3"></i>
            Sign out
          </button>
        </nav>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.router-link-active {
  background-color: var(--primary-color);
  color: white;
  background-color:#429818;
}

/* Transition for mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>