import { create } from "zustand";

const useTasksStore = create((set) => ({
  tasksByStatus: [[], [], []],
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  setTasksByStatus: (statusGroupedTasks) =>
    set({ tasksByStatus: statusGroupedTasks }),
}));

export default useTasksStore;
