import { create } from 'zustand';
import type { InferenceResult } from '@types';

interface InferenceStore {
  results: Map<string, InferenceResult>;
  currentResult: InferenceResult | null;
  isLoading: boolean;
  
  setResult: (key: string, result: InferenceResult) => void;
  getResult: (key: string) => InferenceResult | undefined;
  setCurrentResult: (result: InferenceResult | null) => void;
  setIsLoading: (loading: boolean) => void;
  clearAll: () => void;
}

export const useInferenceStore = create<InferenceStore>((set, get) => ({
  results: new Map(),
  currentResult: null,
  isLoading: false,
  
  setResult: (key: string, result: InferenceResult) => {
    const newResults = new Map(get().results);
    newResults.set(key, result);
    set({ results: newResults });
  },
  
  getResult: (key: string) => {
    return get().results.get(key);
  },
  
  setCurrentResult: (result: InferenceResult | null) => {
    set({ currentResult: result });
  },
  
  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  clearAll: () => {
    set({ results: new Map(), currentResult: null, isLoading: false });
  }
}));
