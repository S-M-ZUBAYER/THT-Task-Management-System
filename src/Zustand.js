import { create } from "zustand";

export const useBugStore = create((set) => ({
  bugs: [],
  bugProjectName: "",
  id: null,
  setBugs: (bugs) => set({ bugs }),
  addBug: (newBug) =>
    set((state) => ({
      bugs: [...state.bugs, newBug],
    })),
  setBugProjectName: (bugProjectName) => set({ bugProjectName }),
  setId: (id) => set({ id }),
}));

export const useTaskStore = create((set) => ({
  task: null,
  setTask: (task) => set({ task }),
}));
