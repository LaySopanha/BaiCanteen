<script setup>
import { ref, onMounted } from 'vue';
import { Line, Bar, Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  ArcElement
);

// Mock data for demonstration
const revenueData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Revenue ($)',
    data: [521, 480, 674, 432, 743, 890, 647],
    borderColor: '#059669',
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    tension: 0.4,
    fill: true
  }]
};

const orderData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Orders',
    data: [45, 39, 54, 41, 58, 72, 53],
    backgroundColor: '#059669',
  }]
};

const menuPerformanceData = {
  labels: ['Fried Rice', 'Noodles', 'Soup', 'Salad', 'Drinks'],
  datasets: [{
    data: [30, 25, 15, 20, 10],
    backgroundColor: [
      '#059669',
      '#10B981',
      '#34D399',
      '#6EE7B7',
      '#A7F3D0',
    ],
  }]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    }
  }
};

// Stats data
const stats = ref({
  todayOrders: 24,
  todayRevenue: 647,
  totalCustomers: 158,
  avgOrderValue: 27
});

// Recent orders
const recentOrders = ref([
  { id: 1, customer: 'John Doe', items: 3, total: 35, status: 'completed', time: '10:30 AM' },
  { id: 2, customer: 'Jane Smith', items: 2, total: 28, status: 'preparing', time: '10:45 AM' },
  { id: 3, customer: 'Mike Johnson', items: 4, total: 42, status: 'pending', time: '11:00 AM' },
  { id: 4, customer: 'Sarah Wilson', items: 1, total: 15, status: 'completed', time: '11:15 AM' },
]);

const getStatusColor = (status) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    preparing: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 mr-4">
            <i class="pi pi-shopping-cart text-green-600 text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Today's Orders</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.todayOrders }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 mr-4">
            <i class="pi pi-dollar text-blue-600 text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Today's Revenue</p>
            <p class="text-2xl font-semibold text-gray-900">${{ stats.todayRevenue }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 mr-4">
            <i class="pi pi-users text-purple-600 text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Total Customers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalCustomers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 mr-4">
            <i class="pi pi-chart-line text-yellow-600 text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Avg Order Value</p>
            <p class="text-2xl font-semibold text-gray-900">${{ stats.avgOrderValue }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Revenue Chart -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Weekly Revenue</h2>
        <div class="h-80">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
      </div>

      <!-- Orders Chart -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Weekly Orders</h2>
        <div class="h-80">
          <Bar :data="orderData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Menu Performance -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Menu Performance</h2>
        <div class="h-64">
          <Doughnut :data="menuPerformanceData" :options="chartOptions" />
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th class="px-6 py-3">Order ID</th>
                <th class="px-6 py-3">Customer</th>
                <th class="px-6 py-3">Items</th>
                <th class="px-6 py-3">Total</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order.id">
                <td class="px-6 py-4">#{{ order.id }}</td>
                <td class="px-6 py-4">{{ order.customer }}</td>
                <td class="px-6 py-4">{{ order.items }}</td>
                <td class="px-6 py-4">${{ order.total }}</td>
                <td class="px-6 py-4">
                  <span :class="['px-2 py-1 rounded-full text-xs font-medium', getStatusColor(order.status)]">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4">{{ order.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 40vh;
  width: 100%;
}
</style>