<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

// States for the three modes: Login/SignUp and Reset Password
const isLogin = ref(true);
const isResetPassword = ref(false);

const loading = ref(false);
const error = ref('');

// Form data for Login/SignUp
const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  role: 'student'
});

// Data for Reset Password functionality
const resetEmail = ref('');

// Show/hide states for password fields
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Tab selector functions
const selectLogin = () => {
  isLogin.value = true;
  isResetPassword.value = false;
  error.value = '';
};

const selectSignUp = () => {
  isLogin.value = false;
  isResetPassword.value = false;
  error.value = '';
};

const switchToResetPassword = () => {
  isResetPassword.value = true;
  error.value = '';
};

const backToLogin = () => {
  isResetPassword.value = false;
  error.value = '';
};

// Dynamic form title
const formTitle = computed(() => {
  if (isResetPassword.value) return 'Reset Password';
  return isLogin.value ? 'Login' : 'Sign Up';
});

const submitButtonText = computed(() =>
  loading.value ? 'Processing...' : formTitle.value
);

// Validate form input based on the current mode
const validateForm = () => {
  if (isResetPassword.value) {
    if (!resetEmail.value) {
      error.value = 'Please provide your email address';
      return false;
    }
    return true;
  }
  if (!formData.value.email || !formData.value.password) {
    error.value = 'Please fill in all required fields';
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

// Handle form submission for Login/SignUp/Reset Password
const handleSubmit = async () => {
  error.value = '';
  if (!validateForm()) return;

  loading.value = true;
  try {
    if (isResetPassword.value) {
      // Replace the following with an API call to send a reset email
      console.log('Reset password for', resetEmail.value);
      error.value = 'Reset link sent! Please check your email.';
      resetEmail.value = '';
      // Optionally, return to the login form after a delay:
      setTimeout(() => {
        isResetPassword.value = false;
        error.value = '';
      }, 3000);
    } else {
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
        const redirectPath =
          route.query.redirect ||
          (auth.userRole === 'vendor' ? '/vendor/dashboard' : '/student/menu');
        router.push(redirectPath);
      } else {
        error.value = 'Authentication failed';
      }
    }
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

// Toggle functions for showing/hiding passwords
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">

      <!-- Form Header -->
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-gray-800">{{ formTitle }}</h2>
      </div>

      <!-- Reset Password Form -->
      <template v-if="isResetPassword">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label for="reset-email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="reset-email"
              v-model="resetEmail"
              required
              placeholder="you@example.com"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary dark:focus:ring-green-800 focus:border-primary dark:focus:border-green-800"
            />
          </div>
          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center px-4 py-2 bg-primary dark:bg-green-800 text-white rounded-md shadow hover:bg-primary-dark dark:hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-green-800"
            >
              {{ submitButtonText }}
            </button>
          </div>
        </form>
        <div class="text-center mt-4">
          <button @click="backToLogin" class="text-blue-600 hover:underline">
            Back to Login
          </button>
        </div>
      </template>

      <!-- Login / Sign Up Form -->
      <template v-else>
        <!-- Tab Toggle (for Login/Sign Up) -->
        <div class="flex justify-center mb-6">
          <button
            @click="selectLogin"
            :class="{
              'border-b-2 border-primary text-primary': isLogin,
              'text-gray-600': !isLogin
            }"
            class="px-4 py-2 focus:outline-none"
          >
            Login
          </button>
          <button
            @click="selectSignUp"
            :class="{
              'border-b-2 border-primary text-primary': !isLogin,
              'text-gray-600': isLogin
            }"
            class="px-4 py-2 focus:outline-none ml-4"
          >
            Sign Up
          </button>
        </div>

        <!-- Login / Sign Up Form Inputs -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Email Address -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              placeholder="you@example.com"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary dark:focus:ring-green-800 focus:border-primary dark:focus:border-green-800"
            />
          </div>
          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="formData.password"
                required
                placeholder="********"
                class="mt-1 block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary dark:focus:ring-green-800 focus:border-primary dark:focus:border-green-800"
              />
              <button
                type="button"
                @click="toggleShowPassword"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-blue-600"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
          <!-- "Forgot Password?" Link (only for Login) -->
          <div v-if="isLogin" class="text-right text-sm">
            <button type="button" @click="switchToResetPassword" class="text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>
          <!-- Confirm Password Input (Sign Up only) -->
          <div v-if="!isLogin">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                required
                placeholder="********"
                class="mt-1 block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary dark:focus:ring-green-800 focus:border-primary dark:focus:border-green-800"
              />
              <button
                type="button"
                @click="toggleShowConfirmPassword"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-blue-600"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
          <!-- Role Selection (Sign Up only) -->
          <div v-if="!isLogin">
            <label for="role" class="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              v-model="formData.role"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary dark:focus:ring-green-800 focus:border-primary dark:focus:border-green-800"
            >
              <option value="student">Student</option>
              <option value="vendor">Vendor</option>
            </select>
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
              class="w-full flex justify-center px-4 py-2 bg-primary dark:bg-green-700 text-white rounded-md shadow hover:bg-primary-dark dark:hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-green-800"
            >
              {{ submitButtonText }}
            </button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styling (if necessary) */
</style>