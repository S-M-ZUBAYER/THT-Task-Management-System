import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "@/lib/axiosApi";
import { useTaskStore } from "@/Zustand/useTaskStore";

export default function useTaskData() {
  const { id } = useParams();
  const { setTask } = useTaskStore();

  const fetchTaskById = async (taskId = id) => {
    if (!taskId) {
      console.warn("No task ID provided.");
      return;
    }

    try {
      const res = await axiosApi.get(`/task-details/${taskId}`);
      const taskData = res?.data.data;

      if (!taskData) {
        console.error("No task data found in API response.");
        return;
      }

      setTask(taskData);
    } catch (error) {
      console.error("Failed to fetch task:", error);
    }
  };

  useEffect(() => {
    if (id) fetchTaskById();
  }, [id]);

  return { id, fetchTaskById };
}
