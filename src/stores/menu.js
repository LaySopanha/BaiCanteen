import { defineStore } from 'pinia';
import menuData from '@/assets/data/MenuList.json';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuItems: [],
    votes: {},
    loading: false,
    error: null,
    currentVotingPeriod: null
  }),

  getters: {
    getMenuItemById: (state) => (id) => {
      return state.menuItems.find(item => item.id === id);
    },
    
    getVoteCountForItem: (state) => (id) => {
      return state.votes[id] || 0;
    },
    
    sortedByVotes: (state) => {
      return [...state.menuItems].sort((a, b) => 
        (state.votes[b.id] || 0) - (state.votes[a.id] || 0)
      );
    }
  },

  actions: {
    async fetchMenuItems() {
      this.loading = true;
      try {
        // TODO: Replace with actual API call
        this.menuItems = menuData;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async submitVote(menuItemId) {
      this.loading = true;
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.votes[menuItemId] = (this.votes[menuItemId] || 0) + 1;
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async fetchVotes() {
      this.loading = true;
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.votes = {
          1: 15,
          2: 8,
          3: 12
        };
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
});