<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const isLogin = ref(true);
const loading = ref(false);
const error = ref('');

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  role: 'student'
});

const toggleForm = () => {
  isLogin.value = !isLogin.value;
  error.value = '';
};

const formTitle = computed(() => isLogin.value ? 'Login' : 'Sign Up');
const submitButtonText = computed(() => loading.value ? 'Processing...' : formTitle.value);

const validateForm = () => {
  if (!formData.value.email || !formData.value.password) {
    error.value = 'Please fill in all fields';
    return false;
  }

  if (!isLogin.value) {
    if (formData.value.password !== formData.value.confirmPassword) {
      error.value = 'Passwords do not match';
      return false;
    }
    if (!formData.value.role) {
      error.value = 'Please select a role';
      return false;
    }
  }

  return true;
};

const handleSubmit = async () => {
  error.value = '';
  if (!validateForm()) return;

  loading.value = true;
  try {
    let success;
    if (isLogin.value) {
      success = await auth.login(formData.value.email, formData.value.password);
    } else {
      success = await auth.signup(
        formData.value.email, 
        formData.value.password, 
        formData.value.role
      );
    }

    if (success) {
      const redirectPath = route.query.redirect || 
        (auth.userRole === 'vendor' ? '/vendor/dashboard' : '/student/menu');
      router.push(redirectPath);
    } else {
      error.value = 'Authentication failed';
    }
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ formTitle }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="formData.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <!-- Confirm Password (Sign Up only) -->
          <div v-if="!isLogin">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <!-- Role Selection (Sign Up only) -->
          <div v-if="!isLogin">
            <label for="role" class="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div class="mt-1">
              <select
                id="role"
                v-model="formData.role"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="student">Student</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {{ submitButtonText }}
            </button>
          </div>
        </form>

        <!-- Toggle Form -->
        <div class="mt-6">
          <button
            @click="toggleForm"
            class="w-full text-center text-sm text-primary hover:text-green-700"
          >
            {{ isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>