<script setup>
import { defineProps } from 'vue';
defineProps({
    menu: {
        type: Object,
        default: () => ({
            title: 'N/A',
            image: 'N/A',
            price: 'N/A',
            description: 'N/A',
            rating: 'N/A'
        })
    }
});

</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
            <div class="p-4">
              <div class="mb-6">
                <div class="text-gray-600 my-2">Full-Time</div>
                <h3 class="text-xl font-bold">{{ menu.title }}</h3>
              </div>

              <div class="mb-5">
                {{ menu.description }}
              </div>

              <h3 class="text-green-500 mb-2">
                ${{ menu.price }}
              </h3>

              <div class="border border-gray-100 mb-5"></div>

              <div class="flex flex-col lg:flex-row justify-between mb-4">
                <div class="text-orange-700 mb-3">
                  <i class="fa-solid fa-location-dot text-lg"></i>
                  {{ menu.rating }}
                </div>
                <a
                  href="/menu"
                  class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
</template>