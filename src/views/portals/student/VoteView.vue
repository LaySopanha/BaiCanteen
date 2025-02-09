<script setup>
import { onMounted, ref } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const selectedItem = ref(null);
const hasVoted = ref(false);

onMounted(async () => {
  await menuStore.fetchMenuItems();
  await menuStore.fetchVotes();
});

const handleVote = async () => {
  if (!selectedItem.value) return;
  
  const success = await menuStore.submitVote(selectedItem.value);
  if (success) {
    hasVoted.value = true;
  }
};
</script>

<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Vote for Tomorrow's Meal</h1>

      <!-- Loading State -->
      <div v-if="menuStore.loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading menu items...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="menuStore.error" class="bg-red-50 p-4 rounded-lg">
        <p class="text-red-600">{{ menuStore.error }}</p>
      </div>

      <!-- Success State -->
      <template v-else>
        <!-- Voting Form -->
        <div v-if="!hasVoted" class="space-y-4">
          <div
            v-for="item in menuStore.menuItems"
            :key="item.id"
            class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            :class="{ 'border-2 border-primary': selectedItem === item.id }"
            @click="selectedItem = item.id"
          >
            <div class="flex items-center space-x-4">
              <input
                type="radio"
                :name="'meal-vote'"
                :value="item.id"
                v-model="selectedItem"
                class="h-4 w-4 text-primary"
              >
              <div class="flex-1">
                <h3 class="font-semibold">{{ item.name }}</h3>
                <p class="text-sm text-gray-600">{{ item.description }}</p>
              </div>
              <div class="text-sm text-gray-500">
                Current Votes: {{ menuStore.getVoteCountForItem(item.id) }}
              </div>
            </div>
          </div>

          <div class="mt-6">
            <button
              @click="handleVote"
              :disabled="!selectedItem"
              class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Vote
            </button>
          </div>
        </div>

        <!-- Post-Vote Display -->
        <div v-else class="text-center py-8">
          <div class="bg-green-50 rounded-lg p-6">
            <i class="pi pi-check-circle text-4xl text-green-500"></i>
            <h2 class="text-xl font-semibold mt-4">Thank you for voting!</h2>
            <p class="mt-2 text-gray-600">Your vote has been recorded.</p>
          </div>

          <h3 class="text-xl font-semibold mt-8 mb-4">Current Results</h3>
          <div class="space-y-4">
            <div
              v-for="item in menuStore.sortedByVotes"
              :key="item.id"
              class="bg-white p-4 rounded-lg shadow"
            >
              <div class="flex justify-between items-center">
                <span class="font-medium">{{ item.name }}</span>
                <span class="text-primary font-semibold">
                  {{ menuStore.getVoteCountForItem(item.id) }} votes
                </span>
              </div>
              <div class="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary rounded-full h-2"
                  :style="`width: ${(menuStore.getVoteCountForItem(item.id) / Math.max(...Object.values(menuStore.votes))) * 100}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>