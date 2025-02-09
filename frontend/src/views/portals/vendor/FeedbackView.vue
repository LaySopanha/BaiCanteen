<script setup>
import { ref } from 'vue';
import DefaultPic from '@/assets/img/food/Default.png';

const newComment = ref('');
const comments = ref([
  { 
    id: 1, 
    user: { name: 'Anonymous', avatar: DefaultPic }, 
    text: 'The dish was amazing, but a tad too salty. Maybe cut back on salt next time?', 
    date: new Date('2023-10-05T11:00:00')
  },
  { 
    id: 2, 
    user: { name: 'Anonymous', avatar: DefaultPic }, 
    text: 'Excellent taste and presentation. Keep up the great work!', 
    date: new Date('2023-10-06T14:30:00')
  }
]);

const postComment = () => {
  if (!newComment.value.trim()) return;
  const newId = comments.value.length 
    ? Math.max(...comments.value.map(c => c.id)) + 1 
    : 1;
  comments.value.push({
    id: newId,
    user: {
      name: 'Vendor',
      avatar: DefaultPic
    },
    text: newComment.value,
    date: new Date()
  });
  newComment.value = '';
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <div class="max-w-3xl mx-auto">
      <!-- Vendor Feedback Header -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Customer Feedback</h1>
        <p class="text-gray-600 mb-4">
          See what your customers are saying about the food and service.
        </p>
        <!-- Simple Comment Form (vendors may just want to see the feedback or leave a note) -->
        <div class="border-t pt-4">
          <div class="flex space-x-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="User avatar"
              class="w-10 h-10 rounded-full"
            />
            <textarea
              v-model="newComment"
              class="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Write a response here..."
            ></textarea>
          </div>
          <div class="flex justify-end mt-3">
            <button
              @click="postComment"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-800"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Feedback Comments</h2>
        <div v-for="comment in comments" :key="comment.id" class="flex mb-4">
          <img
            :src="comment.user.avatar"
            alt="User avatar"
            class="w-10 h-10 rounded-full mr-4"
          />
          <div class="bg-white p-4 rounded-lg shadow w-full">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-gray-800">{{ comment.user.name }}</span>
              <span class="text-xs text-gray-500">
                {{ new Date(comment.date).toLocaleString() }}
              </span>
            </div>
            <p class="text-gray-700">{{ comment.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional vendor-specific styling if needed */
</style>