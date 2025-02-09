<script setup>
import Hero from '@/components/Hero.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';

// State for selected plan and billing period
const selectedPlan = ref('basic');
const billingPeriod = ref('monthly');

// Pricing data
const plans = ref({
  basic: {
    name: 'Basic',
    monthly: 0,
    yearly: 0,
    features: [
      'Basic ordering functionality',
      'Menu viewing',
      'Basic notifications'
    ]
  },
  pro: {
    name: 'Pro',
    monthly: 9,
    yearly: 90,
    features: [
      'All Basic features',
      'Priority ordering',
      'Advanced analytics'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    monthly: 'Custom',
    yearly: 'Custom',
    features: [
      'All Pro features',
      'Custom integration',
      '24/7 support'
    ]
  }
});

// Computed price based on billing period
const getPrice = (plan) => {
  if (typeof plan[billingPeriod.value] === 'number') {
    return `$${plan[billingPeriod.value]}`;
  }
  return plan[billingPeriod.value];
};

// Handle plan selection
const selectPlan = (planKey) => {
  selectedPlan.value = planKey;
};

// Handle subscription
const handleSubscribe = (planKey) => {
  // Here you would typically integrate with your payment processing system
  console.log(`Subscribing to ${planKey} plan with ${billingPeriod.value} billing`);
};
</script>

<template>
  <!-- Pricing Header -->
  <Hero bgColor="bg-gray-50">
    <template #left>
      <div class="text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
          Simple, <span class="text-secondary-100">Transparent</span> Pricing
        </h1>
        <p class="mt-4 text-xl text-gray-700">
          Choose the plan that works best for your needs
        </p>
      </div>
    </template>
  </Hero>

  <!-- Billing Period Toggle -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
    <div class="flex justify-center items-center space-x-4">
      <button 
        @click="billingPeriod = 'monthly'"
        :class="[
          'px-4 py-2 rounded-lg',
          billingPeriod === 'monthly' 
            ? 'bg-primary text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        Monthly
      </button>
      <button 
        @click="billingPeriod = 'yearly'"
        :class="[
          'px-4 py-2 rounded-lg',
          billingPeriod === 'yearly' 
            ? 'bg-primary text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        Yearly
        <span class="text-sm ml-1">(Save 20%)</span>
      </button>
    </div>
  </div>

  <!-- Pricing Plans -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Dynamic Plan Cards -->
        <template v-for="(plan, key) in plans" :key="key">
          <div 
            :class="[
              'p-8 rounded-lg border-2 transition-all duration-300 cursor-pointer',
              selectedPlan === key 
                ? 'border-primary bg-primary text-white transform scale-105' 
                : 'border-gray-200 bg-gray-50 hover:border-primary'
            ]"
            @click="selectPlan(key)"
          >
            <h3 class="text-2xl font-bold mb-4">{{ plan.name }}</h3>
            <div class="text-4xl font-bold mb-4">
              {{ getPrice(plan) }}
              <span class="text-lg" v-if="typeof plan[billingPeriod] === 'number'">
                /{{ billingPeriod === 'monthly' ? 'month' : 'year' }}
              </span>
            </div>
            <ul class="space-y-4 mb-8">
              <li 
                v-for="feature in plan.features" 
                :key="feature"
                class="flex items-center"
              >
                <i class="pi pi-check mr-2"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>
            <button 
              @click.stop="handleSubscribe(key)"
              :class="[
                'w-full py-2 rounded-lg transition duration-300',
                selectedPlan === key 
                  ? 'bg-white text-primary hover:bg-gray-100' 
                  : 'bg-primary text-white hover:bg-green-700'
              ]"
            >
              {{ key === 'enterprise' ? 'Contact Us' : 'Get Started' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped>
/* Add any additional styling here */
</style>