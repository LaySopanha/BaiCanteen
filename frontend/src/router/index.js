import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';
import HomeView from '@/views/HomeView.vue';
import AboutMeView from '@/views/AboutMeView.vue';
import AuthenticationView from '@/views/authentication/AuthenticationView.vue';
import FeaturesServiceView from '@/views/FeaturesServiceView.vue';
import PricingView from '@/views/PricingView.vue';

//student
import StudentLayout from '@/layouts/StudentPortalLayout.vue';
import StudentMenuView from '@/views/portals/student/MenuView.vue';
import StudentVoteView from '@/views/portals/student/VoteView.vue';
import StudentResultView from '@/views/portals/student/ResultsView.vue';
import StudentFeedbackView from '@/views/portals/student/FeedbackView.vue';

//vendor
import VendorLayout from '@/layouts/VendorPortalLayout.vue';
import VendorDashboardView from '@/views/portals/vendor/DashboardView.vue';
import VendorMenuManagement from '@/views/portals/vendor/MenuManagementView.vue';
import VendorAnalytics from '@/views/portals/vendor/AnalyticsView.vue';
import VendorOrderView from '@/views/portals/vendor/OrdersView.vue';
import VendorFeedbackView from '@/views/portals/vendor/FeedbackView.vue';

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
        {
          path: '/auth',
          name: 'auth',
          component: AuthenticationView,
          meta: { requiresGuest: true }
        },
  // Student Routes
  {
    path: '/student',
    component: StudentLayout,
    meta: { requiresAuth: true, role: 'student' },
    children: [
      {
        path: '',
        redirect: '/student/menu'
      },
      {
        path: 'menu',
        name: 'studentMenu',
        component: StudentMenuView
      },
      {
        path: 'vote',
        name: 'studentVote',
        component: StudentVoteView
      },
      {
        path: 'results',
        name: 'studentResults',
        component:StudentResultView
      },
      {
        path: 'feedbacks',
        name: 'studentFeedbacks',
        component: StudentFeedbackView
      }
    ]
  },

  // Vendor Routes
  {
    path: '/vendor',
    component: VendorLayout,
    meta: { requiresAuth: true, role: 'vendor' },
    children: [
      {
        path: '',
        redirect: '/vendor/dashboard'
      },
      {
        path: 'dashboard',
        name: 'vendorDashboard',
        component:VendorDashboardView
      },
      {
        path: 'menu-management',
        name: 'vendorMenu',
        component:VendorMenuManagement
      },
      {
        path: 'analytics',
        name: 'vendorAnalytics',
        component:VendorAnalytics
      },
      {
        path: 'orders',
        name: 'vendorOrders',
        component:VendorOrderView
      },
      {
        path: 'feedbacks',
        name: 'vendorFeedbacks',
        component:VendorFeedbackView
      }
    ]
  }
]
});

//router guard

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = auth.isAuthenticated;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthPage = to.path === '/auth';

  if (requiresAuth && !isAuthenticated) {
    next('/auth');
  } else if (isAuthPage && isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    next(auth.userRole === 'vendor' ? '/vendor/dashboard' : '/student/menu');
  } else {
    next();
  }
});

export default router;