<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';

const router = useRouter();
const auth = useAuthStore();

// Form Data
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');

// UI State
const mode = ref('login'); 
const loading = computed(() => auth.loading);
const error = computed(() => auth.error);

// Form Validation
const isValidEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
});

const isValidPassword = computed(() => password.value.length >= 6);

const isValidForm = computed(() => {
    if (mode.value === 'login') {
        return isValidEmail.value && isValidPassword.value;
    } else if (mode.value === 'register') {
        return isValidEmail.value && isValidPassword.value && 
               password.value === confirmPassword.value && name.value;
    } else {
        return isValidEmail.value;
    }
});

// Form Submission Handlers
const handleLogin = async () => {
    if (!isValidForm.value) return;
    
    const success = await auth.login(email.value, password.value);
    if (success) {
        // Redirect to the originally requested URL or home
        router.push(route.query.redirect || '/');
    }
};

const handleRegister = async () => {
    if (!isValidForm.value) return;
    
    const success = await auth.register(email.value, password.value, name.value);
    if (success) {
        router.push(route.query.redirect || '/');
    }
};

const handlePasswordReset = async () => {
    if (!isValidEmail.value) return;
    
    const success = await auth.requestPasswordReset(email.value);
    if (success) {
        mode.value = 'login';
    }
};

const switchMode = (newMode) => {
    mode.value = newMode;
    auth.setError(null);
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <!-- Logo and Title -->
            <div>
                <img class="mx-auto h-12 w-auto" src="@/assets/img/LogoGreen.png" alt="បាយ-Canteen" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {{ mode === 'login' ? 'Sign in to your account' :
                       mode === 'register' ? 'Create your account' :
                       'Reset your password' }}
                </h2>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{{ error }}</span>
            </div>

            <!-- Form -->
            <form class="mt-8 space-y-6" @submit.prevent="
                mode === 'login' ? handleLogin() :
                mode === 'register' ? handleRegister() :
                handlePasswordReset()
            ">
                <!-- Name Field (Register only) -->
                <div v-if="mode === 'register'">
                    <label for="name" class="sr-only">Name</label>
                    <input
                        v-model="name"
                        id="name"
                        name="name"
                        type="text"
                        required
                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Full name"
                    />
                </div>

                <!-- Email Field -->
                <div>
                    <label for="email" class="sr-only">Email address</label>
                    <input
                        v-model="email"
                        id="email"
                        name="email"
                        type="email"
                        required
                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>

                <!-- Password Fields (Login and Register) -->
                <template v-if="mode !== 'reset'">
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            v-model="password"
                            id="password"
                            name="password"
                            type="password"
                            required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>

                    <!-- Confirm Password (Register only) -->
                    <div v-if="mode === 'register'">
                        <label for="confirmPassword" class="sr-only">Confirm Password</label>
                        <input
                            v-model="confirmPassword"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            placeholder="Confirm password"
                        />
                    </div>
                </template>

                <!-- Submit Button -->
                <div>
                    <button
                        type="submit"
                        :disabled="!isValidForm || loading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    >
                        <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <!-- Loading spinner -->
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                        {{ mode === 'login' ? 'Sign in' :
                           mode === 'register' ? 'Register' :
                           'Reset Password' }}
                    </button>
                </div>

                <!-- Mode Switching Links -->
                <div class="text-sm text-center space-y-2">
                    <template v-if="mode === 'login'">
                        <p>
                            <a @click="switchMode('register')" class="font-medium text-primary hover:text-green-700 cursor-pointer">
                                Don't have an account? Register
                            </a>
                        </p>
                        <p>
                            <a @click="switchMode('reset')" class="font-medium text-primary hover:text-green-700 cursor-pointer">
                                Forgot your password?
                            </a>
                        </p>
                    </template>
                    <template v-else>
                        <p>
                            <a @click="switchMode('login')" class="font-medium text-primary hover:text-green-700 cursor-pointer">
                                Already have an account? Sign in
                            </a>
                        </p>
                    </template>
                </div>
            </form>
        </div>
    </div>
</template>