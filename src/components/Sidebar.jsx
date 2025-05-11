import React from "react";
import { Home, ListTodo, Bug, Users, Calendar, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Tasks", icon: ListTodo, path: "/tasks" },
  { label: "Bug management", icon: Bug, path: "/bugs" },
  { label: "Employees", icon: Users, path: "/employees" },
  { label: "Events", icon: Calendar, path: "/events" },
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
              {React.createElement(link.icon, { size: 18 })}
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
          <LogOut size={18} /> Log out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
