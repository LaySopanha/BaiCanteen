<script setup>
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';
import ResetPasswordForm from './ResetPasswordForm.vue';

const activeTab = ref('login');

const tabs = [
  { id: 'login', label: 'Login' },
  { id: 'signup', label: 'Sign Up' },
  { id: 'reset', label: 'Reset Password' }
];
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="@/assets/img/LogoGreen.png" alt="បាយ-Canteen" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Welcome to បាយ-Canteen
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Tabs -->
        <div class="flex space-x-4 mb-8 border-b">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="pb-2 px-4 text-sm font-medium transition-colors"
            :class="[
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Content -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <LoginForm v-if="activeTab === 'login'" />
          <SignupForm v-if="activeTab === 'signup'" />
          <ResetPasswordForm v-if="activeTab === 'reset'" />
        </transition>
      </div>
    </div>
  </div>
</template>