import { create } from "zustand";

export const useBugStore = create((set) => ({
  bugs: null,
  setBugs: (bugs) => {
    const sortedBugs = bugs.sort((a, b) => b.id - a.id);
    set({ bugs: sortedBugs });
  },
}));
