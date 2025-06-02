import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icons from "@/constants/icons";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";

function EmployeeDropDown({ employee, fetchData, onEdit }) {
  const handleDelete = async () => {
    try {
      await axiosApi.post("/user/delete", {
        id: employee.id,
      });
      toast.success("Employee deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }
  };
  const handleMakeAdmin = async () => {
    try {
      await axiosApi.post(`/makeAdmin/${employee.id}`);
      toast.success("Employee made admin successfully");
      fetchData();
    } catch (error) {
      console.error("Error making employee admin:", error);
      toast.error("Failed to make employee admin");
    }
  };
  const handleEdit = () => {
    onEdit(employee);
    console.log("Edit employee:", employee);
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
        ...
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div
            className="flex items-center text-[#004368] "
            onClick={handleEdit}
          >
            <img src={icons.Edit} alt="Edit" className="w-4 h-4 mr-2" />
            <p>Edit Employee</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex items-center text-[#004368] "
            onClick={handleMakeAdmin}
          >
            <img src={icons.manager} alt="Edit" className="w-4 h-4 mr-2" />
            <p>Make As Admin</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex items-center text-[#004368] "
            onClick={handleDelete}
          >
            <img src={icons.Delete} alt="Edit" className="w-4 h-4 mr-2" />
            <p>Remove Employee</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EmployeeDropDown;
