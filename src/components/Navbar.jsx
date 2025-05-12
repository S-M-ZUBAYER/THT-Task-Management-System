import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-end gap-4 p-4 pr-20 ">
      <Input placeholder="Search" className="w-1/3" />
      <div className="border-2 border-[#B0C5D0] rounded-full p-1">
        <Bell className="text-[#B0C5D0]" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/300" />
        </Avatar>
        <p className="font-semibold">
          Hello! <span className="text-blue-600">Sultan</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
