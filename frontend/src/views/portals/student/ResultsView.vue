<script setup>
import { onMounted, onUnmounted, computed } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();

// Fetch menu items and votes
const fetchData = async () => {
  await menuStore.fetchMenuItems();
  await menuStore.fetchVotes();
};

onMounted(async () => {
  await fetchData();
  intervalId = setInterval(() => {
    menuStore.fetchVotes();
  }, 5000); // Live update every 5 seconds
});

let intervalId;
onUnmounted(() => {
  clearInterval(intervalId);
});

// Compute food counts and ratio (based on all items)
const totalFoodCount = computed(() => menuStore.menuItems.length);
const availableFoodCount = computed(() =>
  menuStore.menuItems.filter(item => item.availability).length
);
const percentAvailable = computed(() =>
  totalFoodCount.value ? Math.round((availableFoodCount.value / totalFoodCount.value) * 100) : 0
);

// Only show available items in the results
const sortedAvailableVotes = computed(() =>
  menuStore.sortedByVotes.filter(item => item.availability)
);

// Compute top items
const topThreeItems = computed(() => sortedAvailableVotes.value.slice(0, 3));
const topExtraItems = computed(() => sortedAvailableVotes.value.slice(3, 6)); // positions 4-6 (top 6 total)
const otherContenders = computed(() => sortedAvailableVotes.value.slice(6));

// Maximum votes for scaling progress bars (using 1 for division safety)
const maxVotes = computed(() => {
  const votesArr = sortedAvailableVotes.value.map(item => menuStore.getVoteCountForItem(item.id));
  return votesArr.length ? Math.max(...votesArr) : 1;
});

// Import images from assets folder
const images = import.meta.glob('/src/assets/img/food/*.{png,jpg,jpeg,gif,webp}', { eager: true, as: 'url' });
const getImagePath = (imageName) => {
  const key = `/src/assets/img/food/${imageName}`;
  if (images[key]) {
    return images[key];
  } else {
    console.error('Image not found:', imageName);
    // Fallback image
    return images['/src/assets/img/food/Default.png'];
  }
};
</script>

<template>
  <!-- Outer container: fix height to viewport and disable outer scrolling -->
  <div class="p-6 bg-gray-50 h-screen overflow-hidden">
    <div class="max-w-6xl mx-auto h-full flex flex-col">
      <!-- Header Section with voting title and food availability ratio -->
      <div>
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-2">
          Live Voting Results
        </h1>
        <p class="text-gray-600 text-center mb-2">
          Check out the updated leaderboard in real time!
        </p>
        <div class="text-center text-sm text-gray-600 mb-4">
          Food Availability: <strong>{{ availableFoodCount }}</strong> /
          <strong>{{ totalFoodCount }}</strong> ({{ percentAvailable }}% available)
        </div>
      </div>
      
      <!-- Main Content Container: two columns -->
      <div class="flex flex-col lg:flex-row gap-6 flex-grow overflow-hidden">
        <!-- Left Column: Top 6 Items (Podium for top 3 & Honorable Mentions for positions 4-6) -->
        <div class="w-full lg:w-1/3 h-full">
          <!-- Podium for Top 3 -->
          <div class="podium-container mb-6 flex justify-center items-end">
            <!-- Second Place -->
            <div v-if="topThreeItems[1]" class="podium second mx-2">
              <div class="rank-badge">2</div>
              <img
                :src="getImagePath(topThreeItems[1].image)"
                :alt="topThreeItems[1].name"
                class="w-16 h-16 object-cover rounded-full mx-auto"
              />
              <div class="name mt-1 text-base font-semibold text-gray-700 text-center">
                {{ topThreeItems[1].name }}
              </div>
              <div class="votes text-xs text-blue-600 text-center">
                {{ menuStore.getVoteCountForItem(topThreeItems[1].id) }} votes
              </div>
            </div>
            <!-- First Place -->
            <div v-if="topThreeItems[0]" class="podium first mx-2">
              <div class="rank-badge">1</div>
              <img
                :src="getImagePath(topThreeItems[0].image)"
                :alt="topThreeItems[0].name"
                class="w-20 h-20 object-cover rounded-full border-4 border-yellow-400 mx-auto"
              />
              <div class="name mt-1 text-base font-bold text-gray-800 text-center">
                {{ topThreeItems[0].name }}
              </div>
              <div class="votes text-xs text-blue-600 text-center">
                {{ menuStore.getVoteCountForItem(topThreeItems[0].id) }} votes
              </div>
            </div>
            <!-- Third Place -->
            <div v-if="topThreeItems[2]" class="podium third mx-2">
              <div class="rank-badge">3</div>
              <img
                :src="getImagePath(topThreeItems[2].image)"
                :alt="topThreeItems[2].name"
                class="w-16 h-16 object-cover rounded-full mx-auto"
              />
              <div class="name mt-1 text-base font-semibold text-gray-700 text-center">
                {{ topThreeItems[2].name }}
              </div>
              <div class="votes text-xs text-blue-600 text-center">
                {{ menuStore.getVoteCountForItem(topThreeItems[2].id) }} votes
              </div>
            </div>
          </div>
          <!-- Honorable Mentions for Positions 4-6 -->
          <div v-if="topExtraItems.length" class="honorable-container mb-6 text-center">
            <h2 class="text-xl font-bold text-gray-800 mb-2">Honorable Mentions</h2>
            <div class="flex justify-center space-x-3">
              <div
                v-for="(item, idx) in topExtraItems"
                :key="item.id"
                class="honorable-item bg-white rounded-lg shadow p-2 text-center"
              >
                <div class="rank-badge-small">{{ idx + 4 }}</div>
                <img
                  :src="getImagePath(item.image)"
                  :alt="item.name"
                  class="w-14 h-14 object-cover rounded-full mx-auto"
                />
                <div class="name mt-1 text-sm font-semibold text-gray-800">
                  {{ item.name }}
                </div>
                <div class="votes text-xs text-blue-600">
                  {{ menuStore.getVoteCountForItem(item.id) }} votes
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Other Contenders in a single scrollable container -->
        <div class="w-full lg:w-2/3 h-full overflow-y-auto border border-gray-300 rounded-lg p-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Other Contenders
          </h2>
          <div v-if="otherContenders.length" class="space-y-4">
            <div
              v-for="(item, index) in otherContenders"
              :key="item.id"
              class="p-4 bg-white rounded-lg shadow flex items-center"
            >
              <span class="mr-4 text-xl font-bold text-gray-600">
                #{{ index + 7 }}
              </span>
              <img
                :src="getImagePath(item.image)"
                :alt="item.name"
                class="w-14 h-14 object-cover rounded-full mr-4"
              />
              <div class="flex-grow">
                <div class="text-lg font-semibold text-gray-800">
                  {{ item.name }}
                </div>
              </div>
              <div class="text-blue-600 font-medium mr-4">
                {{ menuStore.getVoteCountForItem(item.id) }} votes
              </div>
              <div class="relative w-40 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                  :style="{ width: (menuStore.getVoteCountForItem(item.id) / maxVotes) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            No other contestants.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Podium container styling for Top 3 items */
.podium-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.podium {
  text-align: center;
  position: relative;
}

.first {
  transform: translateY(0);
}
.second,
.third {
  transform: translateY(10px);
}

/* Rank badge styling (mimicking Kahoot’s style) */
.rank-badge {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fbbf24;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
}

/* Honorable Mentions styling */
.honorable-item {
  width: 130px;
}
.rank-badge-small {
  background-color: #4ade80;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  margin: 0 auto;
  margin-bottom: 0.25rem;
}
</style>