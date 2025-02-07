<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authentication';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import logo from '@/assets/img/WhiteLogo.png'


const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const isAuthenticated = computed(() => auth.isAuthenticated);

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}
const logout = () =>{
  auth.clearAuth();
  router.push('/');
}
</script>

<template>
      <nav class="bg-primary border-b border-green-700">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <!-- <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" /> -->
              <img :src="logo" alt="Canteen" class="w-auto" style="height: 70px;" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2">
                </span
              >
            </RouterLink>
            <div class="md:ml-auto flex">
              <div class="flex space-x-4 items-center">
                <RouterLink
                  to="/"
                  :class="[
                    isActiveLink('/') 
                    ?'bg-green-900'
                    :'hover:bg-green-900 hover:text-white',
                    'text-white', 'px-3',
                    'py-2',
                    'rounded-md'
                    ]"
                  >Home
                </RouterLink>
                <RouterLink
                  to="/about"
                  :class="[
                    isActiveLink('/about') 
                    ?'bg-green-900'
                    :'hover:bg-green-900 hover:text-white',
                    'text-white', 'px-3',
                    'py-2',
                    'rounded-md'
                    ]"
                  >About
                </RouterLink>
                <RouterLink
                  to="/featuresService"
                  :class="[
                    isActiveLink('/featuresService') 
                    ?'bg-green-900'
                    :'hover:bg-green-900 hover:text-white',
                    'text-white', 'px-3',
                    'py-2',
                    'rounded-md'
                    ]"
                  >Features and Service
                </RouterLink>
                <RouterLink
                  to="/pricing"
                  :class="[
                    isActiveLink('/pricing') 
                    ?'bg-green-900'
                    :'hover:bg-green-900 hover:text-white',
                    'text-white', 'px-3',
                    'py-2',
                    'rounded-md'
                    ]"
                  >Pricing
                </RouterLink>
                <!-- Public links -->
                <RouterLink 
                  v-if="!isAuthenticated" 
                  to="/auth"
                  :class="[
                      isActiveLink('/auth') 
                          ? 'bg-green-900'
                          : 'hover:bg-green-900 hover:text-white',
                      'text-white px-3 py-2 rounded-md'
                  ]"
              >
                  Login
              </RouterLink>
                <button
                  @click="logout"
                  class="text-white px-3 py-2 rounded-md hover:bg-green-900"
                  >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>