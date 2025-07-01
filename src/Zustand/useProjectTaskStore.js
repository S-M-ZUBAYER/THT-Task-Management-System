import { create } from "zustand";

export const useProjectTaskStore = create((set) => ({
  tasks: [],
  setTasks: (tas) => set({ tasks: tas }),
}));
