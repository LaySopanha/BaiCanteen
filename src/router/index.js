import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';
import HomeView from '@/views/HomeView.vue';
import MenuListingView from '@/views/MenuListView.vue';
import MealView from '@/views/MealView.vue';
import AboutMeView from '@/views/AboutMeView.vue';
import LiveVoteView from '@/views/LiveVoteView.vue';
import SettingView from '@/views/SettingView.vue';
import AuthenticationView from '@/views/authentication/AuthenticationView.vue';
import FeaturesServiceView from '@/views/FeaturesServiceView.vue';
import PricingView from '@/views/PricingView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Public routes
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutMeView
        },
        {
            path: '/featuresService',
            name: 'featuresService',
            component: FeaturesServiceView
        },
        {
            path: '/pricing',
            name: 'pricing',
            component: PricingView
        },
        // Authentication routes
        {
            path: '/auth',
            name: 'auth',
            component: AuthenticationView,
            meta: { requiresGuest: true } // Only accessible when not logged in
        },
        // Protected routes (require authentication)
        {
            path: '/menu',
            name: 'menu',
            component: MenuListingView,
            meta: { requiresAuth: true }
        },
        {
            path: '/meal',
            name: 'meal',
            component: MealView,
            meta: { requiresAuth: true }
        },
        {
            path: '/liveVote',
            name: 'liveVote',
            component: LiveVoteView,
            meta: { requiresAuth: true }
        },
        {
            path: '/setting',
            name: 'setting',
            component: SettingView,
            meta: { requiresAuth: true }
        }
    ]
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    
    // Check if route requires authentication
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        // Redirect to auth page with return URL
        next({ 
            path: '/auth', 
            query: { redirect: to.fullPath } 
        });
    }
    // Check if route requires guest (non-authenticated) access
    else if (to.meta.requiresGuest && auth.isAuthenticated) {
        // Redirect to home or previous intended destination
        next(to.query.redirect || '/');
    }
    else {
        next();
    }
});

export default router;