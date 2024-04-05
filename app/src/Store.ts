import { create } from "zustand";

export const useStore = create((set) => ({
  // handles impact wallet animations
  showStars: false,
  showZap: false,
  showBitcoin: false,
  setShowStars: () => set((state) => ({ showStars: !state.showStars })),
  setShowZap: () => set((state) => ({ showZap: !state.showZap })),
  setShowBitcoin: () => set((state) => ({ showBitcoin: !state.showBitcoin })),
}));
