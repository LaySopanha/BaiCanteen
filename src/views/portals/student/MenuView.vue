<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const selectedCategory = ref('All');
const searchQuery = ref('');

const categories = [
    'All', 
    'Main Dish', 
    'Noodle Soup', 
    'Noodle Dish', 
    'Dip & Side Dish', 
    'Soup', 
    'Breakfast Dish', 
    'Stir-Fry', 
    'Dessert', 
    'Street Snack', 
    'Sandwich', 
    'Grilled Dish', 
    'Beverage'
];

onMounted(async () => {
  await menuStore.fetchMenuItems();
  console.log("Menu Items:", menuStore.menuItems);
});

const filteredItems = computed(() => {
  return menuStore.menuItems.filter(item => {
    const matchesCategory = selectedCategory.value === 'All' || 
                            item.category === selectedCategory.value;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// Pagination state
const currentPage = ref(1);
const pageSize = ref(6); // Change as needed

// Compute the total number of pages
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / pageSize.value);
});

// Compute the items for the current page
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredItems.value.slice(start, end);
});

// Functions to change pages
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Import all images from the folder for multiple file types
const images = import.meta.glob('/src/assets/img/food/*.{png,jpg,jpeg,gif,webp}', { eager: true, as: 'url' });

const getImagePath = (imageName) => {
  const key = `/src/assets/img/food/${imageName}`;
  if (images[key]) {
    return images[key];
  } else {
    console.error('Image not found:', imageName);
    // Fallback to a default image (ensure this exists)
    return images['/src/assets/img/food/Default.png'];
  }
};
</script>


<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold mb-4">Today's Menu</h1>
        
        <!-- Search and Filter -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search menu items..."
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
              />
              <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <div class="w-full sm:w-48">
            <select
              v-model="selectedCategory"
              class="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
            >
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in paginatedItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            :src="getImagePath(item.image)"
            :alt="item.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-lg">{{ item.title }}</h3>
              <span class="text-primary font-semibold">RM{{ item.price }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span class="px-2 py-1 bg-gray-100 text-sm rounded-full">
                {{ item.category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center items-center mt-8">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-l-lg border border-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span class="px-4 py-2 border-t border-b border-gray-300">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-r-lg border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="text-center py-12">
        <i class="pi pi-inbox text-4xl text-gray-400"></i>
        <p class="mt-4 text-gray-600">No menu items found</p>
      </div>
    </div>
  </div>
</template>
