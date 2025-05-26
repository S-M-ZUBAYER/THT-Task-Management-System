import React, { useEffect, useState } from "react";
import EmployeeCard from "@/components/employee/EmployeeCard";
import { AddEmployeeDailog } from "@/components/employee/AddEmployeeDailog";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";

const EmployeePage = () => {
  const [adminData, setAdminData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.role === "Admin") {
        setShowAddEmployeeDialog(true);
      }
    }

    const fetchData = async () => {
      try {
        const res = await axiosApi.get("/users/getAll");
        const data = res.data.result;
        const adminData = data.filter((user) => user.role === "Admin");
        const userData = data.filter((user) => user.role === "user");
        setAdminData(adminData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        toast.error("Failed to fetch employee data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div>
        <p className="text-[1.7vw] text-[#004368] font-[600] mb-5">Admin</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {adminData.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} show={false} />
          ))}
        </div>
        <hr className="my-6" />
        <p className="text-[1.7vw] text-[#004368] font-[600] mb-5">User</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {userData.map((employee, index) => (
            <EmployeeCard
              key={index}
              employee={employee}
              show={showAddEmployeeDialog}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        {showAddEmployeeDialog && <AddEmployeeDailog />}
      </div>
    </div>
  );
};

export default EmployeePage;
