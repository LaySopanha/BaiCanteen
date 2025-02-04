<script setup>
import Hero from '@/components/Hero.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <!-- About Page Header -->
  <Hero bgColor="bg-gray-100">
    <template #left>
      <div class="text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
          About <span class="text-secondary-100">បាយ-Canteen</span>
        </h1>
        <p class="mt-4 text-xl text-gray-700">
          Empowering students and vendors to reimagine the canteen experience.
        </p>
      </div>
    </template>
    <template #right>
      <div class="mt-8 sm:mt-0 flex justify-center">
        <!-- Replace with your About image or illustration -->
        <img
          src="@/assets/img/LogoGreen.png"
          alt="About us"
          class="w-full sm:w-11/12 lg:w-5/6 h-auto rounded-lg mx-auto"
        />
      </div>
    </template>
  </Hero>

  <!-- Our Story Section -->
  <section class="py-12 bg-white">
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-green-700 text-center mb-6">Our Story</h2>
      <p class="text-xl text-gray-700 leading-relaxed text-center">
        Founded with a passion to improve the daily dining experience, បាយ-Canteen began as a small idea among friends tired of long queues and limited meal choices. Today, we leverage technology to make every meal a delightful, efficient, and personalized experience.
      </p>
    </div>
  </section>

  <!-- Mission & Vision Section -->
  <section class="py-12 bg-green-700 text-white">
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">Our Mission & Vision</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Mission Card -->
        <div class="bg-green-800 p-6 rounded-lg shadow">
          <h3 class="text-2xl font-semibold mb-2">Our Mission</h3>
          <p class="text-lg">
            To simplify the canteen experience by providing smart solutions that reduce wait times, streamline ordering, and deliver personalized meal options for students and vendors alike.
          </p>
        </div>
        <!-- Vision Card -->
        <div class="bg-green-800 p-6 rounded-lg shadow">
          <h3 class="text-2xl font-semibold mb-2">Our Vision</h3>
          <p class="text-lg">
            To create a future where technology and culinary delight converge, transforming everyday dining into a seamless and enjoyable experience for communities everywhere.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Team Section (Optional) -->
  <section class="py-12 bg-gray-100">
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-green-700 text-center mb-6">Meet the Team</h2>
      <p class="text-xl text-gray-700 text-center mb-8">
        Our diverse team is dedicated to revolutionizing the canteen experience.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Team Member Card -->
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <img
            src="@/assets/img/logo.png"
            alt="Team Member 1"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold">Hou nestar</h3>
          <p class="text-green-700">CEO</p>
        </div>
        <!-- Another Team Member Card -->
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <img
            src="@/assets/img/logo.png"
            alt="Team Member 2"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold">Narith Sopheakleab</h3>
          <p class="text-green-700">Co-Founder</p>
        </div>
        <!-- Third Team Member Card -->
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <img
            src="@/assets/img/logo.png"
            alt="Team Member 3"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold">Lay Sopanha</h3>
          <p class="text-green-700">Lead Developer</p>
        </div>
      </div>
    </div>
  </section>
<Footer />
</template>
