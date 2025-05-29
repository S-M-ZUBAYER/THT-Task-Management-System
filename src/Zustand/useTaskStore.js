import { create } from "zustand";

export const useTaskStore = create((set) => ({
  task: null,
  setTasks: (task) => set({ task }),
}));
