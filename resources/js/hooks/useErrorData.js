import { create } from "zustand";

export const useErrorDataStore = create((set) => ({
  error: [],
  toggle: () => set((errorData) => ({ error: errorData })),
}));
