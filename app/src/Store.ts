import { create } from "zustand";

export const useStore = create((set) => ({
  // handles impact wallet animations
  showStars: false,
  showZap: false,
  setShowStars: () => set((state) => ({ showStars: !state.showStars })),
  setShowZap: () => set((state) => ({ showZap: !state.showZap })),
}));
