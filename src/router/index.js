import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MenuListingView from '@/views/MenuListView.vue';
import MealView from '@/views/MealView.vue';
import AboutMeView from '@/views/AboutMeView.vue';
import LiveVoteView from '@/views/LiveVoteView.vue';
import SettingView from '@/views/SettingView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/menu',
            name: 'menu',
            component: MenuListingView
        },
        {
            path: '/meal',
            name: 'meal',
            component: MealView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutMeView
        },
        {
            path: '/liveVote',
            name: 'liveVote',
            component: LiveVoteView
        },
        {
            path: '/setting',
            name: 'setting',
            component: SettingView
        }
    ]
});
export default router;