import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { axiosApi } from "@/lib/axiosApi";
import useTaskData from "@/hook/useTaskData";
import useTaskColumns from "@/hook/useTasksData";

const TaskStatus = ({ current }) => {
  const { id } = useTaskData();
  const { fetchTasks } = useTaskColumns();
  const updateStatus = async (value) => {
    try {
      await axiosApi.post(`/taskStatus/${id}`, { status: value });
      toast.success("Task status updated successfully");
      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update bug status"
      );
    }
  };
  return (
    <div className="flex justify-between items-center ">
      <h3 className="font-semibold mb-2 text-[#004368] ">Status</h3>
      <div className="px-4 py-1 text-sm flex gap-6 border border-[#B0C5D0] rounded-[1vh] text-[#004368]">
        <Select defaultValue={current} onValueChange={updateStatus}>
          <SelectTrigger
            style={{
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
              boxShadow: "none",
            }}
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TaskStatus;
