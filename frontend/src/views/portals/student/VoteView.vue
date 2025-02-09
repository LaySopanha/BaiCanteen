<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const searchQuery = ref('');

// Fetch menu items on mount
onMounted(async () => {
  await menuStore.fetchMenuItems();
});

// Computed properties for ratio display
const totalFoodCount = computed(() => menuStore.menuItems.length);
const availableFoodCount = computed(() =>
  menuStore.menuItems.filter(item => item.availability === true).length
);
const percentAvailable = computed(() =>
  totalFoodCount.value > 0 
    ? Math.round((availableFoodCount.value / totalFoodCount.value) * 100)
    : 0
);

// Filter to only available items matching search query
const availableItems = computed(() =>
  menuStore.menuItems.filter(item => item.availability === true)
);
const filteredItems = computed(() => {
  if (!searchQuery.value) return availableItems.value;
  return availableItems.value.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Sort items by votes descending (for leaderboard style)
const sortedItems = computed(() => {
  return [...filteredItems.value].sort((a, b) => (b.votes || 0) - (a.votes || 0));
});

// Toast state and vote action
const toastMessage = ref('');
const showToast = ref(false);
const castVote = (item) => {
  if (typeof item.votes === 'undefined') {
    item.votes = 0;
  }
  item.votes++;
  toastMessage.value = `You voted for "${item.title}"! Total votes: ${item.votes}`;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Import images from assets folder (supporting multiple file types)
const images = import.meta.glob('/src/assets/img/food/*.{png,jpg,jpeg,gif,webp}', { eager: true, as: 'url' });
const getImagePath = (imageName) => {
  const key = `/src/assets/img/food/${imageName}`;
  if (images[key]) {
    return images[key];
  } else {
    console.error('Image not found:', imageName);
    // Fallback to a default image (ensure Default.png exists)
    return images['/src/assets/img/food/Default.png'];
  }
};
</script>

<template>
  <!-- Background matching app's style -->
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Simple Toast Notification -->
    <div v-if="showToast" class="fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50">
      {{ toastMessage }}
    </div>

    <!-- Main Container -->
    <div class="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
      <!-- Header Section -->
      <header class="mb-6">
        <div class="flex flex-col sm:flex-row items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-800">Live Food Voting</h1>
          <div class="mt-4 sm:mt-0">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search dishes..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
        <p class="mt-2 text-gray-600">
          Vote for your favorite dishes and watch the leaderboard update in real time.
        </p>
        <!-- Ratio Display -->
        <div class="mt-2 text-gray-600 text-sm">
          Food Availability: <strong>{{ availableFoodCount }}</strong> / 
          <strong>{{ totalFoodCount }}</strong> ({{ percentAvailable }}%)
        </div>
      </header>

      <!-- Leaderboard Container with fixed height -->
      <div class="border-t border-gray-200 pt-4 max-h-[500px] overflow-y-auto">
        <div v-if="sortedItems.length" class="divide-y divide-gray-200">
          <!-- Each item shows a subtle hover effect; top five get a badge indicator -->
          <div
            v-for="(item, index) in sortedItems"
            :key="item.id"
            class="flex items-center py-4 transition-colors duration-200 hover:bg-gray-50"
          >
            <img
              :src="getImagePath(item.image)"
              :alt="item.title"
              class="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div class="flex-grow">
              <h2 class="text-xl font-semibold text-gray-800 flex items-center">
                {{ item.title }}
                <!-- Top 5 badge indicator -->
                <span v-if="index < 5" class="ml-3 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  Top {{ index + 1 }}
                </span>
              </h2>
              <p class="text-gray-500 text-sm">{{ item.description }}</p>
            </div>
            <div class="flex flex-col items-end">
              <button
                @click="castVote(item)"
                class="mb-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
              >
                Vote
              </button>
              <span class="flex items-center text-lg text-gray-800">
                <i class="pi pi-heart-fill text-red-500 mr-1"></i>
                {{ item.votes || 0 }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-500">
          No dishes found.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Minimal styling and hover effect applied for clarity */
</style>