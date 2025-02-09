<script setup>
import { onMounted } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();

onMounted(async () => {
  await menuStore.fetchMenuItems();
  await menuStore.fetchVotes();
});
</script>

<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Voting Results</h1>

      <div class="space-y-4">
        <div
          v-for="item in menuStore.sortedByVotes"
          :key="item.id"
          class="bg-white p-4 rounded-lg shadow"
        >
          <div class="flex justify-between items-center mb-2">
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
  </div>
</template>