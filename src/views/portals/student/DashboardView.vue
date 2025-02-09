<script setup>
import { ref } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();

const stats = ref({
  totalOrders: 156,
  pendingOrders: 12,
  totalRevenue: 2580.50,
  popularItems: [
    { name: 'Chicken Rice', orders: 45 },
    { name: 'Nasi Lemak', orders: 38 },
    { name: 'Mee Goreng', orders: 32 }
  ]
});
</script>

<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Orders -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Orders</p>
              <p class="text-2xl font-semibold">{{ stats.totalOrders }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Pending Orders -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Pending Orders</p>
              <p class="text-2xl font-semibold">{{ stats.pendingOrders }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <i class="pi pi-clock text-yellow-500 text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Total Revenue -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Revenue</p>
              <p class="text-2xl font-semibold">RM{{ stats.totalRevenue.toFixed(2) }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i class="pi pi-dollar text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Items -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Popular Items</h2>
        <div class="space-y-4">
          <div
            v-for="item in stats.popularItems"
            :key="item.name"
            class="flex items-center justify-between"
          >
            <span>{{ item.name }}</span>
            <span class="text-primary font-semibold">{{ item.orders }} orders</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>