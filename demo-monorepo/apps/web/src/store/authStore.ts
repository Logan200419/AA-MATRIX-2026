import { create } from 'zustand';
import { mockLogin, mockLogout, getCurrentUser } from '@mocks/auth';
import type { User } from '@types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await mockLogin(email, password);
      set({ user, token, isLoading: false });
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false 
      });
      throw error;
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    try {
      await mockLogout();
      set({ user: null, token: null, isLoading: false });
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));

// Restore auth state from localStorage
export function restoreAuthState() {
  const token = localStorage.getItem('authToken');
  const userJson = localStorage.getItem('authUser');
  
  if (token && userJson) {
    try {
      const user = JSON.parse(userJson);
      useAuthStore.setState({ user, token });
    } catch (e) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }
  }
}
