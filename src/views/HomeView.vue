<script setup>
import Hero from '@/components/Hero.vue';


</script>

<template>

  <!-- Hero Section to show the opening page -->
  <Hero bgColor="bg-white">
    <template #left>
      <div class="text-center sm:text-left sm:w-1/2">
        <h1 class="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
          Dissatisfied With Your <span class="text-secondary-100">CANTEEN</span> Food?
        </h1>
        <p class="my-4 text-xl text-black">
          We simplify lunchtime by empowering students to pre-vote for their meals, reducing wait times, improving satisfaction, and increasing canteen engagement for sellers.
        </p>
        <div class="mt-6">
          <div class="mt-4 flex justify-center">
          <button class="px-6 py-3 text-white bg-primary hover:bg-green-700 rounded-lg text-lg font-semibold transition duration-300">
            Vote Now
          </button>
        </div>
        </div>
      </div>
    </template>
    <template #right>
      <div class="mt-8 sm:mt-0 sm:w-full flex justify-center">
        <img src="@/assets/img/LogoGreen.png" alt="Canteen" class="w-full sm:w-4/5 lg:w-3/4 h-auto rounded-lg mx-auto" />
      </div>
    </template>
  </Hero>

  <!-- Second Hero Section: Benefits for Students and Vendors -->
  <Hero bgColor="bg-primary">
    <!-- Left Slot: Benefit Card for Students -->
    <!-- <template #top>
      <h1 class="text-3xl text-white font-bold tracking-wide text-center sm:text-left">
          Why បាយ-Canteen?
        </h1>
        <div class="line-container h-0.5 bg-white mt-2 w-2/3 mx-auto sm:mx-0"></div>
         
    </template> -->
    <template #top>
    <!-- Overall header section with green background -->
        <header class="bg-primary py-4 px-0">

        <div class="max-w-5xl ml-0 mr-auto">
            <h1 class="text-white text-3xl font-bold">
            Why បាយ-Canteen?
            </h1>
            <svg
            class="h-auto"
            width="400px"
            height="auto"
            viewBox="0 0 400 5"
            xmlns="http://www.w3.org/2000/svg"
            >

                <!-- Horizontal line #1 -->
                <path
                    d="M0 5 H290"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    fill="none"
                />

                <!-- Diagonal line (thinner) -->
                <path
                    d="M290 5 L305 0"
                    stroke="#FFFFFF"
                    stroke-width="1.5"   
                    fill="none"
                />
                <!-- Horizontal line #2 -->
                <path
                    d="M305 0 H400"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    fill="none"
                />
        </svg>

        </div>
        </header>
    </template>

    <template #left>
      <div class="px-4 text-white">

        <div class="mt-8">
          <!-- Card for Students -->
          <div class="bg-white text-green-700 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-2">For Students</h2>
            <ul class="list-disc list-inside">
              <li>Convenient online ordering</li>
              <li>Time-saving pickup or delivery</li>
              <li>Easy, secure payments</li>
              <li>Personalized meal suggestions</li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <!-- Right Slot: Benefit Card for Canteen Vendors -->
    <template #right>
      <div class="px-4 text-white">
        <div class="mt-8">
          <!-- Card for Vendors -->
          <div class="bg-white text-green-700 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-2">For Canteen Vendors</h2>
            <ul class="list-disc list-inside">
              <li>Streamlined order management</li>
              <li>Real-time sales tracking</li>
              <li>Efficient inventory oversight</li>
              <li>Enhanced reach & promotion</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </Hero>
</template>
