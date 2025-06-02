import { create } from "zustand";

const useTasksStore = create((set) => ({
  tasksByStatus: [[], [], []],

  setTasksByStatus: (groupedTasks) => set({ tasksByStatus: groupedTasks }),
}));

export default useTasksStore;
