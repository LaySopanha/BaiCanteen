<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const showAddModal = ref(false);
const editingItem = ref(null);
const loading = ref(false);

// New item form state
const newItem = ref({
  name: '',
  description: '',
  price: '',
  category: '',
  image: null, // This will hold either a File or, if already uploaded, a filename string
  available: true
});

// Vendor categories (you can adjust these if needed)
const categories = [
  'Main Course',
  'Side Dish',
  'Dessert',
  'Beverage',
  'Snack'
];

onMounted(async () => {
  await menuStore.fetchMenuItems();
});

// Image upload handler
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    newItem.value.image = file;
  }
};

// Reset the form
const resetForm = () => {
  newItem.value = {
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    available: true
  };
  editingItem.value = null;
};

// Submit handler (for add or update)
const handleSubmit = async () => {
  loading.value = true;
  try {
    if (editingItem.value) {
      await menuStore.updateMenuItem({
        ...newItem.value,
        id: editingItem.value.id
      });
    } else {
      await menuStore.addMenuItem(newItem.value);
    }
    showAddModal.value = false;
    resetForm();
  } catch (error) {
    console.error('Error saving menu item:', error);
  } finally {
    loading.value = false;
  }
};

const editItem = (item) => {
  editingItem.value = item;
  // Copy the item into the form
  newItem.value = { ...item };
  showAddModal.value = true;
};

const toggleAvailability = async (item) => {
  try {
    await menuStore.updateMenuItem({
      ...item,
      available: !item.available
    });
  } catch (error) {
    console.error('Error updating availability:', error);
  }
};

// ---------------------------------------------------
// New: Pagination State & Computed Properties
const currentPage = ref(1);
const pageSize = ref(6); // Change this to the desired number of items per page

const totalPages = computed(() => {
  return Math.ceil(menuStore.menuItems.length / pageSize.value);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return menuStore.menuItems.slice(start, start + pageSize.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
// ---------------------------------------------------

// New: Import all images (supporting multiple extensions) using Vite's glob import.
// Make sure your images are located under /src/assets/img/food/
const images = import.meta.glob('/src/assets/img/food/*.{png,jpg,jpeg,gif,webp}', { eager: true, as: 'url' });

// New: Helper function to lookup an image by filename
const getImagePath = (imageName) => {
  // Construct the key based on how the glob keys are formed
  const key = `/src/assets/img/food/${imageName}`;
  if (images[key]) {
    return images[key];
  } else {
    console.error('Image not found:', imageName);
    // Fallback to a default image – ensure Default.png exists in that folder.
    return images['/src/assets/img/food/Default.png'];
  }
};
</script>

<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Menu Management</h1>
        <button
          @click="showAddModal = true"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <i class="pi pi-plus mr-2"></i>
          Add New Item
        </button>
      </div>

      <!-- Menu Items Grid with Pagination -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Use paginatedItems instead of full list -->
        <div
          v-for="item in paginatedItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <!-- Use getImagePath() to get the local image URL -->
          <img
            :src="getImagePath(item.image)"
            :alt="item.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-lg">{{ item.name }}</h3>
              <span class="text-primary font-semibold">៛{{ item.price }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span class="px-2 py-1 bg-gray-100 text-sm rounded-full">
                {{ item.category }}
              </span>
              <div class="flex space-x-2">
                <button
                  @click="toggleAvailability(item)"
                  class="p-2 rounded-lg"
                  :class="item.available ? 'text-green-600' : 'text-gray-400'"
                >
                  <i class="pi pi-check-circle"></i>
                </button>
                <button
                  @click="editItem(item)"
                  class="p-2 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  <i class="pi pi-pencil"></i>
                </button>
                <button
                  @click="menuStore.deleteMenuItem(item.id)"
                  class="p-2 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center items-center mt-8" v-if="totalPages > 1">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-l-lg border border-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span class="px-4 py-2 border-t border-b border-gray-300">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-r-lg border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <!-- Add/Edit Modal -->
      <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4">
            {{ editingItem ? 'Edit Menu Item' : 'Add New Menu Item' }}
          </h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                v-model="newItem.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                v-model="newItem.description"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Price (៛)</label>
              <input
                v-model="newItem.price"
                type="number"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <select
                v-model="newItem.category"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              >
                <option value="">Select a category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="mt-1 block w-full"
              />
            </div>

            <div class="flex items-center">
              <input
                v-model="newItem.available"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-700">Available</label>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showAddModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {{ loading ? 'Saving...' : (editingItem ? 'Update' : 'Add') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
