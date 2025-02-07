import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null
    }),
    actions: {
        setAuth(token, user) {
            this.token = token;
            this.user = user;
            this.isAuthenticated = true;
            this.error = null;
            localStorage.setItem('token', token);
        },
        clearAuth() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            this.error = null;
            localStorage.removeItem('token');
        },
        setError(error) {
            this.error = error;
        },
        setLoading(status) {
            this.loading = status;
        },
        async login(email, password) {
            this.setLoading(true);
            this.error = null;
            try {
                const response = await mockLoginAPI(email, password);
                this.setAuth(response.token, response.user);
                return true;
            } catch (error) {
                this.setError(error.message);
                return false;
            } finally {
                this.setLoading(false);
            }
        },
        async register(email, password, name) {
            this.setLoading(true);
            this.error = null;
            try {
                const response = await mockRegisterAPI(email, password, name);
                this.setAuth(response.token, response.user);
                return true;
            } catch (error) {
                this.setError(error.message);
                return false;
            } finally {
                this.setLoading(false);
            }
        },
        async requestPasswordReset(email) {
            this.setLoading(true);
            this.error = null;
            try {
                await mockPasswordResetAPI(email);
                return true;
            } catch (error) {
                this.setError(error.message);
                return false;
            } finally {
                this.setLoading(false);
            }
        }
    }
});

// Mock APIs (replace with real APIs later)
function mockLoginAPI(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
                resolve({
                    token: 'mock-token',
                    user: {
                        id: 1,
                        email,
                        name: 'Test User'
                    }
                });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1000);
    });
}

function mockRegisterAPI(email, password, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email && password && name) {
                resolve({
                    token: 'mock-token',
                    user: {
                        id: 1,
                        email,
                        name
                    }
                });
            } else {
                reject(new Error('All fields are required'));
            }
        }, 1000);
    });
}

function mockPasswordResetAPI(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email) {
                resolve({ message: 'Password reset email sent' });
            } else {
                reject(new Error('Email is required'));
            }
        }, 1000);
    });
}