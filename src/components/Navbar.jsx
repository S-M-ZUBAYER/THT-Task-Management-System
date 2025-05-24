import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { base64ToImage } from "@/lib/base64Toimage";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const imageUrl = base64ToImage(user?.image) || "https://i.pravatar.cc/300";
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="flex items-center justify-end gap-4 p-4 pt-8 pr-20 ">
      {show && (
        <Input
          placeholder="Search"
          className="w-1/4 rounded-2xl"
          style={{
            outline: "none",
            boxShadow: "none",
          }}
        />
      )}

      <div
        className="border-1 border-[#B0C5D0] rounded-full p-1"
        onClick={handleShow}
      >
        <Search className="text-[#B0C5D0]" />
      </div>
      <div className="border-1 border-[#B0C5D0] rounded-full p-1">
        <Bell className="text-[#B0C5D0]" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={imageUrl} />
        </Avatar>
        <p className="font-semibold">
          Hello! <span className="text-blue-600">Sultan</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
