<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authentication';

const auth = useAuthStore();
const loading = ref(false);
const error = ref('');
const success = ref(false);
const email = ref('');

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;

  try {
    // Mock password reset request
    await new Promise(resolve => setTimeout(resolve, 1000));
    success.value = true;
  } catch (e) {
    error.value = 'Failed to send reset instructions. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <div v-if="!success" class="space-y-6">
      <p class="text-sm text-gray-600">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <form @submit.prevent="handleSubmit">
        <div>
          <label for="reset-email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="pi pi-envelope text-gray-400"></i>
            </div>
            <input
              id="reset-email"
              v-model="email"
              type="email"
              required
              class="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div v-if="error" class="mt-4 text-red-600 text-sm">
          {{ error }}
        </div>

        <div class="mt-6">
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <i v-if="loading" class="pi pi-spinner animate-spin mr-2"></i>
            {{ loading ? 'Sending...' : 'Send reset instructions' }}
          </button>
        </div>
      </form>
    </div>

    <div v-else class="text-center">
      <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <i class="pi pi-check text-green-600 text-xl"></i>
      </div>
      <h3 class="mt-4 text-lg font-medium text-gray-900">Check your email</h3>
      <p class="mt-2 text-sm text-gray-600">
        We've sent password reset instructions to {{ email }}
      </p>
      <div class="mt-6">
        <button
          @click="success = false"
          class="text-sm text-primary hover:text-green-700"
        >
          Try another email
        </button>
      </div>
    </div>
  </div>
</template>