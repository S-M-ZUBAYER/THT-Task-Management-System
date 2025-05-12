import React from "react";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const employeeData = Array(9).fill({
  name: "Golam Rabbani Pias",
  role: "Product Designer",
  date: "01 February 2023",
  phone: "+880 1743830062",
  email: "design.mdgrpias@gmail.com",
  avatar: "https://i.pravatar.cc/150?img=3",
});

const EmployeePage = () => {
  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {employeeData.map((employee, index) => (
          <div
            key={index}
            className="border border-[#f0f0f0] rounded-xl shadow-sm hover:shadow-md transition-all bg-white w-[25vw] p-8 "
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <span className="text-gray-400 text-xl">⋯</span>
            </div>

            <div>
              <h2 className="text-sm text-black font-semibold">
                {employee.name}
              </h2>
            </div>
            <div className="grid grid-cols-2 py-4 gap-2 text-xs text-[#2B2B2B] ">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#B0C5D0] " />
                <span>{employee.role}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#B0C5D0] " />
                <span>{employee.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#B0C5D0] " />
                <span>{employee.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#B0C5D0] " />
                <span>{employee.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          variant="outline"
          style={{
            backgroundColor: "white",
            border: "1.5px solid #004368",
            color: "#004368",
            height: "44px",
            width: "300px",
          }}
        >
          Add new Employee
        </Button>
      </div>
    </div>
  );
};

export default EmployeePage;
