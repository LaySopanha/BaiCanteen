<script setup>
import { ref, onMounted } from 'vue';
import { Line, Bar, Pie } from 'vue-chartjs';
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

const selectedPeriod = ref('week');
const dateRange = ref(['2024-01-01', '2024-01-31']);

const salesTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Sales Trend',
    data: [3200, 4100, 3800, 5200, 4800, 6000],
    borderColor: '#059669',
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    tension: 0.4,
    fill: true
  }]
};

const topSellingItems = {
  labels: ['Fried Rice', 'Noodles', 'Soup', 'Salad', 'Drinks'],
  datasets: [{
    label: 'Units Sold',
    data: [150, 120, 90, 75, 60],
    backgroundColor: [
      '#059669',
      '#10B981',
      '#34D399',
      '#6EE7B7',
      '#A7F3D0',
    ],
  }]
};

const peakHours = {
  labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'],
  datasets: [{
    label: 'Orders',
    data: [15, 30, 85, 45, 35, 55],
    backgroundColor: '#059669',
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

const metrics = ref({
  totalRevenue: 28450,
  averageOrderValue: 32,
  orderCount: 890,
  customerRetentionRate: 75
});

const topCustomers = ref([
  { name: 'John Doe', orders: 45, spent: 1350 },
  { name: 'Jane Smith', orders: 38, spent: 1140 },
  { name: 'Mike Johnson', orders: 32, spent: 960 },
  { name: 'Sarah Wilson', orders: 28, spent: 840 },
  { name: 'Tom Brown', orders: 25, spent: 750 }
]);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
      
      <div class="flex space-x-4">
        <!-- Period Selector -->
        <select v-model="selectedPeriod" class="rounded-lg border-gray-300">
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
        
        <!-- Date Range Picker -->
        <div class="flex space-x-2">
          <input type="date" v-model="dateRange[0]" class="rounded-lg border-gray-300">
          <input type="date" v-model="dateRange[1]" class="rounded-lg border-gray-300">
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
        <p class="text-2xl font-semibold text-gray-900">${{ metrics.totalRevenue }}</p>
        <p class="text-sm text-green-600 mt-2">
          <i class="pi pi-arrow-up mr-1"></i>12% vs last period
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-1">Average Order Value</h3>
        <p class="text-2xl font-semibold text-gray-900">${{ metrics.averageOrderValue }}</p>
        <p class="text-sm text-green-600 mt-2">
          <i class="pi pi-arrow-up mr-1"></i>8% vs last period
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-1">Order Count</h3>
        <p class="text-2xl font-semibold text-gray-900">{{ metrics.orderCount }}</p>
        <p class="text-sm text-green-600 mt-2">
          <i class="pi pi-arrow-up mr-1"></i>15% vs last period
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-1">Customer Retention</h3>
        <p class="text-2xl font-semibold text-gray-900">{{ metrics.customerRetentionRate }}%</p>
        <p class="text-sm text-green-600 mt-2">
          <i class="pi pi-arrow-up mr-1"></i>5% vs last period
        </p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h2>
        <div class="h-80">
          <Line :data="salesTrend" :options="chartOptions" />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h2>
        <div class="h-80">
          <Bar :data="peakHours" :options="chartOptions" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Selling Items -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Top Selling Items</h2>
        <div class="h-64">
          <Pie :data="topSellingItems" :options="chartOptions" />
        </div>
      </div>

      <!-- Top Customers -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Top Customers</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th class="px-6 py-3">Customer</th>
                <th class="px-6 py-3">Orders</th>
                <th class="px-6 py-3">Total Spent</th>
                <th class="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="customer in topCustomers" :key="customer.name">
                <td class="px-6 py-4">{{ customer.name }}</td>
                <td class="px-6 py-4">{{ customer.orders }}</td>
                <td class="px-6 py-4">${{ customer.spent }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Loyal
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>