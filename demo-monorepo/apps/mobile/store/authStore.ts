import { create } from 'zustand';
import { mockLogin, mockLogout } from '@deepfake-demo/mocks';
import type { User } from '@deepfake-demo/types';
import * as SecureStore from 'expo-secure-store';

interface MobileAuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreAuth: () => Promise<void>;
}

export const useMobileAuthStore = create<MobileAuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await mockLogin(email, password);
      set({ user, token, isLoading: false });
      try {
        await SecureStore.setItemAsync('authToken', token);
        await SecureStore.setItemAsync('authUser', JSON.stringify(user));
      } catch {
        // Fallback for iOS simulator
        console.log('SecureStore not available');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await mockLogout();
      set({ user: null, token: null, isLoading: false });
      try {
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('authUser');
      } catch {
        console.log('SecureStore not available');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  restoreAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const userJson = await SecureStore.getItemAsync('authUser');

      if (token && userJson) {
        const user = JSON.parse(userJson);
        set({ user, token });
      }
    } catch {
      console.log('Could not restore auth');
    }
  },
}));
