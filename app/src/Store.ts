import { create } from "zustand";
import { useProofStorage } from "./App.web5";

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

  // Balance state
  globalBalance: localStorage.getItem("balance") || 0,
  setGlobalBalance: (newBalance) => set({ balance: newBalance }),
}));
