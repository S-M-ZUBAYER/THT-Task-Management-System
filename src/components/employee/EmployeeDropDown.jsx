import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icons from "@/constants/icons";

function EmployeeDropDown() {
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
          <div className="flex items-center text-[#004368] ">
            <img src={icons.Edit} alt="Edit" className="w-4 h-4 mr-2" />
            <p>Edit Employee</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center text-[#004368] ">
            <img src={icons.manager} alt="Edit" className="w-4 h-4 mr-2" />
            <p>Make As Admin</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center text-[#004368] ">
            <img src={icons.Delete} alt="Edit" className="w-4 h-4 mr-2" />
            <p>Remove Employee</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EmployeeDropDown;
