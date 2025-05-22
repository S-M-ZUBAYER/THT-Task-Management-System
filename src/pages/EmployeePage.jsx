import React from "react";

import EmployeeCard from "@/components/employee/EmployeeCard";
import { AddEmployeeDailog } from "@/components/employee/AddEmployeeDailog";

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
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {employeeData.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <AddEmployeeDailog />
      </div>
    </div>
  );
};

export default EmployeePage;
