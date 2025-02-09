<script setup>
import { ref, computed } from 'vue';

// Order status options
const statusOptions = {
  pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
  preparing: { label: 'Preparing', class: 'bg-blue-100 text-blue-800' },
  ready: { label: 'Ready', class: 'bg-green-100 text-green-800' },
  completed: { label: 'Completed', class: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Cancelled', class: 'bg-red-100 text-red-800' }
};

// Filters
const filters = ref({
  status: 'all',
  date: '',
  search: ''
});

// Selected orders for batch actions
const selectedOrders = ref([]);

// Modal states
const showOrderDetails = ref(false);
const selectedOrder = ref(null);

// Mock orders data
const orders = ref([
  {
    id: '001',
    customer: 'John Doe',
    items: [
      { name: 'Fried Rice', quantity: 2, price: 12 },
      { name: 'Coca Cola', quantity: 2, price: 4 }
    ],
    total: 32,
    status: 'pending',
    time: '2024-01-20 10:30 AM',
    notes: 'No spicy',
    paymentMethod: 'Cash'
  },
  {
    id: '002',
    customer: 'Jane Smith',
    items: [
      { name: 'Noodles', quantity: 1, price: 10 },
      { name: 'Spring Rolls', quantity: 3, price: 9 }
    ],
    total: 19,
    status: 'preparing',
    time: '2024-01-20 10:45 AM',
    notes: 'Extra sauce',
    paymentMethod: 'Card'
  },
  // Add more mock orders as needed
]);

// Computed filtered orders
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesStatus = filters.value.status === 'all' || order.status === filters.value.status;
    const matchesSearch = order.customer.toLowerCase().includes(filters.value.search.toLowerCase()) ||
                         order.id.includes(filters.value.search);
    const matchesDate = !filters.value.date || order.time.includes(filters.value.date);
    return matchesStatus && matchesSearch && matchesDate;
  });
});

// Methods
const openOrderDetails = (order) => {
  selectedOrder.value = order;
  showOrderDetails.value = true;
};

const updateOrderStatus = (order, newStatus) => {
  order.status = newStatus;
};

const handleBatchAction = (action) => {
  selectedOrders.value.forEach(orderId => {
    const order = orders.value.find(o => o.id === orderId);
    if (order) {
      if (action === 'ready') {
        order.status = 'ready';
      } else if (action === 'cancel') {
        order.status = 'cancelled';
      }
    }
  });
  selectedOrders.value = [];
};

const exportOrders = () => {
  // Implement export functionality
  console.log('Exporting orders...');
};
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
      
      <!-- Action Buttons -->
      <div class="flex space-x-4">
        <button
          @click="exportOrders"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <i class="pi pi-download mr-2"></i>
          Export
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search orders..."
            class="w-full rounded-lg border-gray-300"
          >
        </div>
        
        <div class="w-48">
          <select
            v-model="filters.status"
            class="w-full rounded-lg border-gray-300"
          >
            <option value="all">All Status</option>
            <option v-for="(status, key) in statusOptions" :key="key" :value="key">
              {{ status.label }}
            </option>
          </select>
        </div>
        
        <div class="w-48">
          <input
            v-model="filters.date"
            type="date"
            class="w-full rounded-lg border-gray-300"
          >
        </div>
      </div>
    </div>

    <!-- Batch Actions -->
    <div v-if="selectedOrders.length" class="bg-gray-50 p-4 rounded-lg mb-6 flex items-center justify-between">
      <span class="text-sm text-gray-700">{{ selectedOrders.length }} orders selected</span>
      <div class="flex space-x-4">
        <button
          @click="handleBatchAction('ready')"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Mark as Ready
        </button>
        <button
          @click="handleBatchAction('cancel')"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Cancel Orders
        </button>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  :checked="selectedOrders.length === filteredOrders.length"
                  @change="selectedOrders = $event.target.checked ? filteredOrders.map(o => o.id) : []"
                  class="rounded border-gray-300"
                >
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  v-model="selectedOrders"
                  :value="order.id"
                  class="rounded border-gray-300"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                #{{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ order.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                ${{ order.total }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="statusOptions[order.status].class"
                >
                  {{ statusOptions[order.status].label }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ order.time }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="openOrderDetails(order)"
                  class="text-primary hover:text-green-700 mr-3"
                >
                  <i class="pi pi-eye"></i>
                </button>
                <button
                  v-if="order.status === 'pending'"
                  @click="updateOrderStatus(order, 'preparing')"
                  class="text-blue-600 hover:text-blue-700 mr-3"
                >
                  <i class="pi pi-clock"></i>
                </button>
                <button
                  v-if="order.status === 'preparing'"
                  @click="updateOrderStatus(order, 'ready')"
                  class="text-green-600 hover:text-green-700"
                >
                  <i class="pi pi-check"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Details Modal -->
    <Dialog
      v-model:visible="showOrderDetails"
      modal
      header="Order Details"
      :style="{ width: '50vw' }"
    >
      <div v-if="selectedOrder" class="p-4">
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 class="text-sm font-medium text-gray-500">Order ID</h3>
            <p class="text-lg font-medium">#{{ selectedOrder.id }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Customer</h3>
            <p class="text-lg font-medium">{{ selectedOrder.customer }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Status</h3>
            <span
              class="px-2 py-1 text-xs font-medium rounded-full"
              :class="statusOptions[selectedOrder.status].class"
            >
              {{ statusOptions[selectedOrder.status].label }}
            </span>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Payment Method</h3>
            <p class="text-lg font-medium">{{ selectedOrder.paymentMethod }}</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th class="text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th class="text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th class="text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in selectedOrder.items" :key="item.name">
                <td class="py-2">{{ item.name }}</td>
                <td class="py-2">{{ item.quantity }}</td>
                <td class="py-2">${{ item.price }}</td>
                <td class="py-2">${{ item.quantity * item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-sm font-medium text-gray-500">Notes</h3>
            <p class="text-gray-700">{{ selectedOrder.notes || 'No notes' }}</p>
          </div>
          <div class="text-right">
            <h3 class="text-sm font-medium text-gray-500">Total Amount</h3>
            <p class="text-2xl font-bold text-primary">${{ selectedOrder.total }}</p>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>