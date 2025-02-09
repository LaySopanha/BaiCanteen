<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';

const auth = useAuthStore();
const router = useRouter();

const loading = ref(false);
const error = ref('');
const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  role: 'student',
  name: '',
  agreeToTerms: false
});

const passwordStrength = computed(() => {
  const password = formData.value.password;
  if (!password) return { score: 0, text: '' };
  
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strengthText = [
    'Very weak',
    'Weak',
    'Fair',
    'Good',
    'Strong'
  ][score - 1] || '';

  return { score, text: strengthText };
});

const strengthColor = computed(() => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ];
  return colors[passwordStrength.value.score - 1] || 'bg-gray-200';
});

const validateForm = () => {
  if (!formData.value.email || !formData.value.password || !formData.value.name) {
    error.value = 'Please fill in all required fields';
    return false;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match';
    return false;
  }

  if (formData.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters long';
    return false;
  }

  if (!formData.value.agreeToTerms) {
    error.value = 'Please agree to the terms and conditions';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  error.value = '';
  if (!validateForm()) return;

  loading.value = true;
  try {
    const success = await auth.signup(
      formData.value.email,
      formData.value.password,
      formData.value.role,
      formData.value.name
    );

    if (success) {
      router.push(auth.userRole === 'vendor' ? '/vendor/dashboard' : '/student/menu');
    } else {
      error.value = 'Registration failed';
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
    <!-- Name -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">
        Full Name
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="pi pi-user text-gray-400"></i>
        </div>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="John Doe"
        />
      </div>
    </div>

    <!-- Email -->
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

    <!-- Password -->
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
      <!-- Password Strength Indicator -->
      <div class="mt-2">
        <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-300"
            :class="strengthColor"
            :style="{ width: `${(passwordStrength.score / 5) * 100}%` }"
          ></div>
        </div>
        <p class="mt-1 text-xs text-gray-500">
          Password strength: {{ passwordStrength.text }}
        </p>
      </div>
    </div>

    <!-- Confirm Password -->
    <div>
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
        Confirm Password
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="pi pi-lock text-gray-400"></i>
        </div>
        <input
          id="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          required
          class="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="••••••••"
        />
      </div>
    </div>

    <!-- Role Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700">
        I am a
      </label>
      <div class="mt-2 flex space-x-4">
        <label class="inline-flex items-center">
          <input
            type="radio"
            v-model="formData.role"
            value="student"
            class="form-radio text-primary focus:ring-primary"
          />
          <span class="ml-2">Student</span>
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            v-model="formData.role"
            value="vendor"
            class="form-radio text-primary focus:ring-primary"
          />
          <span class="ml-2">Vendor</span>
        </label>
      </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="flex items-center">
      <input
        id="terms"
        v-model="formData.agreeToTerms"
        type="checkbox"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <label for="terms" class="ml-2 block text-sm text-gray-700">
        I agree to the
        <a href="#" class="text-primary hover:text-green-700">Terms and Conditions</a>
      </label>
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
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
      >
        <i v-if="loading" class="pi pi-spinner animate-spin mr-2"></i>
        {{ loading ? 'Creating account...' : 'Create account' }}
      </button>
    </div>
  </form>
</template>