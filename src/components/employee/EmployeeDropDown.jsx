import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icons from "@/constants/icons";
import { useEmployeeData } from "@/hook/useEmployeeData";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";
import { UpdateEmployeeDialog } from "./UpdateEmployeeDialog";
import { useRef } from "react";

function EmployeeDropDown({ employee }) {
  const dialogRef = useRef();
  const { fetchData } = useEmployeeData();

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

  return (
    <>
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
          <DropdownMenuItem
            onClick={() => {
              dialogRef.current?.open();
            }}
          >
            <div className="flex items-center text-[#004368]">
              <img src={icons.Edit} alt="Edit" className="w-4 h-4 mr-2" />
              <p>Edit Employee</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMakeAdmin}>
            <div className="flex items-center text-[#004368]">
              <img src={icons.manager} alt="Manager" className="w-4 h-4 mr-2" />
              <p>Make As Admin</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <div className="flex items-center text-[#004368]">
              <img src={icons.Delete} alt="Delete" className="w-4 h-4 mr-2" />
              <p>Remove Employee</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateEmployeeDialog ref={dialogRef} employee={employee} />
    </>
  );
}

export default EmployeeDropDown;
