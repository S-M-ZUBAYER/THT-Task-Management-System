import { create } from "zustand";

export const useBugStore = create((set) => ({
  bugs: null,
  setBugs: (bugs) => set({ bugs }),
}));
