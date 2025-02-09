import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || null
  }),

  getters: {
    isStudent: (state) => state.userRole === 'student',
    isVendor: (state) => state.userRole === 'vendor',
    getUserName: (state) => state.user?.name || 'User'
  },

  actions: {
    async login(email, password) {
      try {
        // Mock authentication
        const role = email.includes('student') ? 'student' : 'vendor';
        const user = {
          id: 1,
          name: email.split('@')[0],
          email,
          role
        };

        this.user = user;
        this.isAuthenticated = true;
        this.userRole = role;
        this.token = `mock-token-${Date.now()}`;

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', this.token);
        localStorage.setItem('userRole', role);

        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },

    async signup(userData) {
      try {
        const role = userData.role;
        const user = {
          id: 1,
          name: userData.name,
          email: userData.email,
          role
        };

        this.user = user;
        this.isAuthenticated = true;
        this.userRole = role;
        this.token = `mock-token-${Date.now()}`;

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', this.token);
        localStorage.setItem('userRole', role);

        return true;
      } catch (error) {
        console.error('Signup error:', error);
        return false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;
      this.userRole = null;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    },

    // Method to check and restore session
    checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const role = localStorage.getItem('userRole');

      if (token && user && role) {
        this.token = token;
        this.user = JSON.parse(user);
        this.userRole = role;
        this.isAuthenticated = true;
        return true;
      }
      return false;
    }
  }
});