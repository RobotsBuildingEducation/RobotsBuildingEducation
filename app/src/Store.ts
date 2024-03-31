import { create } from "zustand";

export const useStore = create((set) => ({
  // handles impact wallet animations
  showStars: false,
  showZap: false,
  setShowStars: () => set((state) => ({ showStars: !state.showStars })),
  setShowZap: () => set((state) => ({ showZap: !state.showZap })),

  // handles background loading for openAI modals
  // isFetching: false,
  // response: null,
  // error: null,
  // startFetching: () => set(() => ({ isFetching: true })),
  // setResponse: (response) => set(() => ({ isFetching: false, response })),
  // setError: (error) => set(() => ({ isFetching: false, error })),
}));
