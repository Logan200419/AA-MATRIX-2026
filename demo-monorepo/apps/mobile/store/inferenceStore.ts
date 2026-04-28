import { create } from 'zustand';
import type { InferenceResult } from '@deepfake-demo/types';

interface MobileInferenceStore {
  results: Map<string, InferenceResult>;
  loading: Set<string>;

  getResult: (url: string) => InferenceResult | undefined;
  setResult: (url: string, result: InferenceResult) => void;
  isLoading: (url: string) => boolean;
  setLoading: (url: string, loading: boolean) => void;
  clearAll: () => void;
}

export const useMobileInferenceStore = create<MobileInferenceStore>(
  (set, get) => ({
    results: new Map(),
    loading: new Set(),

    getResult: (url: string) => {
      return get().results.get(url);
    },

    setResult: (url: string, result: InferenceResult) => {
      const newResults = new Map(get().results);
      newResults.set(url, result);
      set({ results: newResults });
    },

    isLoading: (url: string) => {
      return get().loading.has(url);
    },

    setLoading: (url: string, loading: boolean) => {
      const newLoading = new Set(get().loading);
      if (loading) {
        newLoading.add(url);
      } else {
        newLoading.delete(url);
      }
      set({ loading: newLoading });
    },

    clearAll: () => {
      set({ results: new Map(), loading: new Set() });
    },
  })
);
