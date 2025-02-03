<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/WhiteLogo.png'

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
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
                  class="text-white bg-green-900 hover:bg-gray-900 hover:text-white rounded-md px-3 h-10 flex items-center"
                  >Home
                </RouterLink>
                <RouterLink
                  to="/menu"
                  class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 h-10 flex items-center"
                  >Menu
                </RouterLink>
                <RouterLink
                  to="/meal"
                  class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 h-10 flex items-center"
                  >Meal
                </RouterLink>
                <RouterLink
                  to="/about"
                  class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 h-10 flex items-center"
                  >About
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>