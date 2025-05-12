import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import icons from "@/constants/icons";

const links = [
  { label: "Dashboard", icon: icons.Dashboard, path: "/" },
  { label: "Tasks", icon: icons.Task, path: "/tasks" },
  { label: "Bug management", icon: icons.Bug, path: "/bugs" },
  { label: "Employees", icon: icons.Employees, path: "/employees" },
  { label: "Events", icon: icons.Event, path: "/events" },
];

const Sidebar = () => {
  return (
    <aside className="w-80 h-screen  border-[#F0E6FF] border-r p-6 flex flex-col justify-between">
      <div className=" flex flex-col justify-center items-center">
        <div className="py-10">
          <img src="logo.png" className="w-[8vw] " />
        </div>
        <div className="space-y-2">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium hover:text-[#004368] transition-all rounded-lg",
                  isActive && " text-[#004368] "
                )
              }
              style={({ isActive }) => ({
                color: isActive ? "#004368" : "#BDBDBD",
                outline: "none",
              })}
            >
              <img src={link.icon} alt="icons" className="w-5" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="pl-9">
        <Button
          variant="ghost"
          style={{
            backgroundColor: "white",
            outline: "none",
            color: "#BDBDBD",
          }}
        >
          <img src={icons.LogOut} alt="log out" className="w-5" /> Log out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
