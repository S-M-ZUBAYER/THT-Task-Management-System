import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { axiosApi } from "@/lib/axiosApi";

export default function StatusDropdown({ current, id }) {
  const updateStatus = async (value) => {
    try {
      await axiosApi.post(`/bugStatus/${id}`, { status: value });
      toast.success("Bug status updated successfully");
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
