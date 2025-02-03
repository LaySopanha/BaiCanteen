<script setup>
import menuData from '@/MenuList.json';
import MenuListing from '@/components/MenuListing.vue';
import { ref } from 'vue';

const menus = ref(menuData);

</script>

<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Menu List
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MenuListing v-for = "menu in menus" :key="menu.id" :menu = "menu" />
            </div>

        </div>

    </section>

</template>