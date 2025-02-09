<script setup>
import { ref } from 'vue';
import DefaultPic from '@/assets/img/food/Default.png';


// In a real application, you would replace these with API calls.
const newComment = ref('');
const comments = ref([
  { 
    id: 1, 
    user: { name: 'Anonymous', avatar: DefaultPic }, 
    text: 'The food was absolutely delicious and the presentation was top-notch!', 
    date: new Date('2023-10-01T10:00:00')
  },
  { 
    id: 2, 
    user: { name: 'Anonymous', avatar: DefaultPic }, 
    text: 'Great service; however, a bit more spice in the dishes would be ideal.', 
    date: new Date('2023-10-02T12:30:00')
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
      name: 'Anonymous', // Replace with the logged-in student's name
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
      <!-- Feedback Card Header -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Send Feedback to Your Vendor</h1>
        <p class="text-gray-600 mb-4">
          We value your input—let us know what you think about the food, service, or anything you’d like improved.
        </p>
        <!-- Feedback Form -->
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
              placeholder="Write your feedback here..."
            ></textarea>
          </div>
          <div class="flex justify-end mt-3">
            <button
              @click="postComment"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-800"
            >
              Post Feedback
            </button>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
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
/* Additional custom styles if needed */
</style>