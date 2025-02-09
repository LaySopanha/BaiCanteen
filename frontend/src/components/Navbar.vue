<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';
import logo from '@/assets/img/WhiteLogo.png';

const auth = useAuthStore();
const router = useRouter();
const showProfileMenu = ref(false);
const mobileMenuOpen = ref(false);
const dropdownRef = ref(null);

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showProfileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleLogout = async () => {
  try {
    await auth.logout();
    showProfileMenu.value = false;
    mobileMenuOpen.value = false;
    router.push('/auth');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const getPortalPath = () => {
  return auth.userRole === 'vendor' ? '/vendor/dashboard' : '/student/menu';
};
</script>

<template>
  <nav class="bg-primary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left side - Logo and main navigation -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex-shrink-0">
            <img class="h-8 w-auto" :src="logo" alt="Logo" />
          </RouterLink>
          
          <!-- Desktop Navigation Links -->
          <div class="hidden md:block ml-10">
            <div class="flex items-baseline space-x-4">
              <RouterLink
                to="/"
                class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-800"
                :class="{ 'bg-green-900': $route.path === '/' }"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/featuresService"
                class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-800"
                :class="{ 'bg-green-900': $route.path === '/featuresService' }"
              >
                Features and Service
              </RouterLink>
              <RouterLink
                to="/pricing"
                class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-800"
                :class="{ 'bg-green-900': $route.path === '/pricing' }"
              >
                Pricing
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Right side - Auth buttons or Profile dropdown -->
        <div class="flex items-center">
          <!-- Show Login button if not authenticated -->
          <template v-if="!auth.isAuthenticated">
            <RouterLink
              to="/auth"
              class="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Login
            </RouterLink>
          </template>

          <!-- Show Profile dropdown if authenticated -->
          <div v-else class="relative hidden md:block" ref="dropdownRef">
            <button
              @click="showProfileMenu = !showProfileMenu"
              class="flex items-center space-x-2 text-white hover:bg-green-800 px-3 py-2 rounded-md"
            >
              <div class="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center">
                {{ auth.getUserName.charAt(0).toUpperCase() }}
              </div>
              <span class="mr-2">{{ auth.getUserName }}</span>
              <i class="pi pi-angle-down"></i>
            </button>

            <!-- Enhanced Dropdown Menu -->
            <div
              v-show="showProfileMenu"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-primary ring-opacity-5 divide-y divide-gray-100 z-50"
            >
              <div class="px-4 py-3">
                <p class="text-sm text-gray-500">Signed in as</p>
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ auth.getUserName }}
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ auth.userRole.charAt(0).toUpperCase() + auth.userRole.slice(1) }}
                </p>
              </div>

              <div class="py-1">
                <RouterLink
                  :to="getPortalPath()"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showProfileMenu = false"
                >
                  <i class="pi pi-th-large mr-2"></i>
                  {{ auth.userRole === 'vendor' ? 'Vendor Portal' : 'Student Portal' }}
                </RouterLink>

                <RouterLink
                  to="/"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showProfileMenu = false"
                >
                  <i class="pi pi-home mr-2"></i>
                  Landing Page
                </RouterLink>
              </div>

              <div class="py-1">
                <button
                  @click="handleLogout"
                  class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <i class="pi pi-sign-out mr-2"></i>
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-800 focus:outline-none"
          >
            <i :class="['pi text-xl', mobileMenuOpen ? 'pi-times' : 'pi-bars']"></i>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            to="/"
            class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-800"
            :class="{ 'bg-green-900': $route.path === '/' }"
            @click="mobileMenuOpen = false"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/featuresService"
            class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-800"
            :class="{ 'bg-green-900': $route.path === '/featuresService' }"
            @click="mobileMenuOpen = false"
          >
            Features and Service
          </RouterLink>
          <RouterLink
            to="/pricing"
            class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-800"
            :class="{ 'bg-green-900': $route.path === '/pricing' }"
            @click="mobileMenuOpen = false"
          >
            Pricing
          </RouterLink>

          <!-- Mobile Profile Section -->
          <template v-if="auth.isAuthenticated">
            <div class="border-t border-green-800 pt-4 pb-3">
              <div class="flex items-center px-3">
                <div class="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center">
                  {{ auth.getUserName.charAt(0).toUpperCase() }}
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-white">{{ auth.getUserName }}</div>
                  <div class="text-sm font-medium text-green-300">
                    {{ auth.userRole.charAt(0).toUpperCase() + auth.userRole.slice(1) }}
                  </div>
                </div>
              </div>
              <div class="mt-3 px-2 space-y-1">
                <RouterLink
                  :to="getPortalPath()"
                  class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-800"
                  @click="mobileMenuOpen = false"
                >
                  {{ auth.userRole === 'vendor' ? 'Vendor Portal' : 'Student Portal' }}
                </RouterLink>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-800"
                >
                  Sign out
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
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