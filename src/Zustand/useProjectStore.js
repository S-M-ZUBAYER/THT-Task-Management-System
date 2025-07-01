import { create } from "zustand";

export const useProjectStore = create((set) => ({
  project: [],
  setProject: (pro) => set({ project: pro }),
}));
