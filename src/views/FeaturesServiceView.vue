<script setup>
import Hero from '@/components/Hero.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <!-- Features Header -->
  <Hero bgColor="bg-gray-50">
    <template #left>
      <div class="text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
          Our <span class="text-secondary-100">Features</span>
        </h1>
        <p class="mt-4 text-xl text-gray-700">
          Discover how បាយ-Canteen transforms your dining experience
        </p>
      </div>
    </template>
    <!-- <template #right>
      <div class="mt-8 sm:mt-0 flex justify-center">
        <img
          src="@/assets/img/LogoGreen.png"
          alt="Features"
          class="w-full sm:w-11/12 lg:w-5/6 h-auto rounded-lg mx-auto"
        />
      </div>
    </template> -->
  </Hero>

  <!-- Features Grid -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Feature Card 1 -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <i class="pi pi-mobile text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Mobile Ordering</h3>
          <p class="text-gray-600">Order your meals anytime, anywhere with our intuitive mobile interface.</p>
        </div>

        <!-- Feature Card 2 -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <i class="pi pi-clock text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Real-time Updates</h3>
          <p class="text-gray-600">Get instant notifications about your order status and waiting time.</p>
        </div>

        <!-- Feature Card 3 -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <i class="pi pi-chart-line text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Live Voting</h3>
          <p class="text-gray-600">Influence tomorrow's menu by voting for your favorite dishes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="py-12 bg-green-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <h2 class="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- For Students -->
        <div class="bg-green-800 p-8 rounded-lg">
          <h3 class="text-2xl font-bold mb-4">For Students</h3>
          <ul class="space-y-4">
            <li class="flex items-center">
              <i class="pi pi-check-circle mr-2"></i>
              <span>Pre-order meals to avoid queues</span>
            </li>
            <li class="flex items-center">
              <i class="pi pi-check-circle mr-2"></i>
              <span>Vote for menu items</span>
            </li>
            <li class="flex items-center">
              <i class="pi pi-check-circle mr-2"></i>
              <span>Track order status</span>
            </li>
          </ul>
        </div>

        <!-- For Vendors -->
        <div class="bg-green-800 p-8 rounded-lg">
          <h3 class="text-2xl font-bold mb-4">For Vendors</h3>
          <ul class="space-y-4">
            <li class="flex items-center">
              <i class="pi pi-check-circle mr-2"></i>
              <span>Manage orders efficiently</span>
            </li>
            <li class="flex items-center">
              <i class="pi pi-check-circle mr-2"></i>
              <span>Track sales and analytics</span>
            </li>
            <li class="flex items-center">
              <i class="pi pi-check-circle mr-2"></i>
              <span>Receive instant feedback</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>