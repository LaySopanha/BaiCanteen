<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const error = ref('');
const formData = ref({
  email: '',
  password: '',
  remember: false
});

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;

  try {
    const success = await auth.login(formData.value.email, formData.value.password);
    if (success) {
      const redirectPath = route.query.redirect || 
        (auth.userRole === 'vendor' ? '/vendor/dashboard' : '/student/menu');
      router.push(redirectPath);
    } else {
      error.value = 'Invalid email or password';
    }
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email address
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="pi pi-envelope text-gray-400"></i>
        </div>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="you@example.com"
        />
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="pi pi-lock text-gray-400"></i>
        </div>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          required
          class="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="••••••••"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember"
          v-model="formData.remember"
          type="checkbox"
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label for="remember" class="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>
    </div>

    <div v-if="error" class="text-red-600 text-sm">
      {{ error }}
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
      >
        <i v-if="loading" class="pi pi-spinner animate-spin mr-2"></i>
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </div>
  </form>
</template>