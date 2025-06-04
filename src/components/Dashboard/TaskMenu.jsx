import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icons from "@/constants/icons";
import useTaskColumns from "@/hook/useTasksData";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";

function TaskMenu({ id, projectName }) {
  const { fetchTasks, removeTaskById } = useTaskColumns();
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axiosApi.post("/delete-task", {
        task_id: id,
        projectName,
      });
      toast.success("Task deleted successfully");
      removeTaskById(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete Task");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        style={{
          backgroundColor: "transparent",
          height: "auto",
          fontWeight: "normal",
          outline: "none",
          border: "none",
          padding: "0",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M14.625 10.125C15.2463 10.125 15.75 9.6213 15.75 9C15.75 8.3787 15.2463 7.875 14.625 7.875C14.0037 7.875 13.5 8.3787 13.5 9C13.5 9.6213 14.0037 10.125 14.625 10.125Z"
            stroke="#004368"
          />
          <path
            d="M9 10.125C9.6213 10.125 10.125 9.6213 10.125 9C10.125 8.3787 9.6213 7.875 9 7.875C8.3787 7.875 7.875 8.3787 7.875 9C7.875 9.6213 8.3787 10.125 9 10.125Z"
            stroke="#B0C5D0"
          />
          <path
            d="M3.375 10.125C3.9963 10.125 4.5 9.6213 4.5 9C4.5 8.3787 3.9963 7.875 3.375 7.875C2.7537 7.875 2.25 8.3787 2.25 9C2.25 9.6213 2.7537 10.125 3.375 10.125Z"
            stroke="#004368"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div
            className="flex items-center text-[#004368] "
            onClick={handleDelete}
          >
            <img src={icons.Delete} alt="Edit" className="w-4 h-4 mr-2" />
            <p>Delete Task</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TaskMenu;
