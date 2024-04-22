import { create } from "zustand";

export const useStore = create((set) => ({
  // handles impact wallet animations
  showStars: false,
  showZap: false,
  showBitcoin: false,
  setShowStars: () => set((state) => ({ showStars: !state.showStars })),
  setShowZap: () => set((state) => ({ showZap: !state.showZap })),
  setShowBitcoin: () => set((state) => ({ showBitcoin: !state.showBitcoin })),

  // New modal states
  isGlobalModalActive: false,
  modalContent: {}, // This will hold JSON data defining the UI contents
  setIsGlobalModalActive: (isActive) => set({ isGlobalModalActive: isActive }),
  setModalContent: (content) => set({ modalContent: content }),
}));
