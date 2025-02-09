<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-green-700 text-white py-8">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Branding and copyright -->
        <div class="mb-4 md:mb-0 text-center md:text-left">
          <p class="text-lg font-semibold">បាយ-Canteen</p>
          <p class="text-sm">&copy; {{ currentYear }} បាយ-Canteen. All rights reserved.</p>
        </div>
        <!-- Footer navigation links -->
        <div class="flex space-x-4">
          <a href="#" class="hover:underline text-sm">Privacy Policy</a>
          <a href="#" class="hover:underline text-sm">Terms of Service</a>
          <a href="#" class="hover:underline text-sm">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
</template>
