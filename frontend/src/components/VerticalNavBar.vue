<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/WhiteLogo.png'
import menuData from '@/MenuList.json'
import MenuListing from '@/components/MenuListing.vue'
import SidebarIcon from '@/components/SidebarIcon.vue';

const menus = ref(menuData)

const route = useRoute()
function isActiveLink(routePath) {
  return route.path === routePath
}
</script>

<template>
  <!-- Overall page container (column layout) -->
  <div class="flex flex-col min-h-screen">
    <!-- Main Content Area -->
    <div class="flex-1 bg-green-50 p-6">
      <!-- Container for sidebar + main content -->
      <div class="flex">
        <!-- Slim Sidebar -->
        <aside class="bg-primary text-white rounded-md p-4 w-20 flex flex-col items-center space-y-4">
          <!-- Logo area (optionally just an icon) -->
          <div class="flex flex-col items-center">
            <img :src="logo" alt="logo" class="h-10 w-auto" />
            <!-- <span class="mt-2 text-sm font-bold">Canteen</span> -->
          </div>
          <!-- Navigation Icons -->
          <nav class="flex flex-col space-y-2">
            <RouterLink
              to="/menu"
              :class="[
                isActiveLink('/menu') ? 'bg-green-900' : 'hover:bg-green-800',
                'p-3 rounded transition-colors duration-300'
              ]"
            >
              <SidebarIcon icon="pi pi-receipt" />
            </RouterLink>
            <RouterLink
              to="/liveVote"
              :class="[
                isActiveLink('/liveVote') ? 'bg-green-900' : 'hover:bg-green-800',
                'p-3 rounded transition-colors duration-300'
              ]"
            >
              <SidebarIcon icon="pi pi-chart-bar" />
            </RouterLink>
            <RouterLink
              to="/setting"
              :class="[
                isActiveLink('/setting') ? 'bg-green-900' : 'hover:bg-green-800',
                'p-3 rounded transition-colors duration-300'
              ]"
            >
              <SidebarIcon icon="pi pi-cog" />
            </RouterLink>
          </nav>
        </aside>
      </div>
    </div>
  </div>
</template>
