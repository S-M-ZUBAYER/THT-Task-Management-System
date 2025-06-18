import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { axiosApi } from "@/lib/axiosApi";
import { useBugData } from "@/hook/useBugData";
import { useWebSocket } from "@/hook/useWebSocket";
import { format } from "date-fns";
import { useUserData } from "@/hook/useUserData";

export default function StatusDropdown({ current, id, bugName }) {
  const { id: projectId, projectName } = useBugData();
  const { sendMessage } = useWebSocket();
  const { user } = useUserData();

  const updateStatus = async (value) => {
    try {
      await axiosApi.post(`/bugStatus/${id}`, { status: value });
      toast.success("Bug status updated successfully");
      try {
        sendMessage({
          type: "notify_admins",
          message: `Bug "${bugName}" status updated to ${value}`,
          name: user.name.trim(),
          date: format(new Date(), "MM-dd-yyyy"),
          path: `/bug-details/${projectId}/${projectName}`,
        });
      } catch (error) {
        console.error("Error updating bug status:", error);
        toast.error(
          error.response?.data?.message || "Failed to notify bug status"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update bug status"
      );
    }
  };

  return (
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
        <SelectItem value="Solved">Solved</SelectItem>
        <SelectItem value="In Progress">In progress</SelectItem>
        <SelectItem value="Pending">Not started</SelectItem>
      </SelectContent>
    </Select>
  );
}
