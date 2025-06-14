import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useUserData } from "@/hook/useUserData";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user } = useUserData();
  let imageUrl = "https://i.pravatar.cc/300";
  if (user?.image) {
    imageUrl = user.image;
  }
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
      <div className="border-1 border-[#B0C5D0] rounded-full ">
        <NotificationDropdown />
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={imageUrl} />
        </Avatar>
        <p className="font-semibold">
          Hello!{" "}
          <span className="text-blue-600">{user?.name || "sultan"} </span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
