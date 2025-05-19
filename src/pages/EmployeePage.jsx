import React from "react";

import { useNavigate } from "react-router-dom";
import EmployeeCard from "@/components/employee/EmployeeCard";

const employeeData = Array(9).fill({
  name: "Golam Rabbani Pias",
  role: "Product Designer",
  date: "01 February 2023",
  phone: "+880 1743830062",
  email: "design.mdgrpias@gmail.com",
  avatar: "https://i.pravatar.cc/150?img=3",
});

const EmployeePage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {employeeData.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <div
          onClick={() => navigate("/add-employee", { replace: true })}
          className="hover:bg-[#004368]  border-1 border-[#004368] text-[#004368] h-[44px] w-[300px] transition-all hover:text-white flex justify-center items-center rounded-sm font-semibold"
        >
          Add new Employee
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
