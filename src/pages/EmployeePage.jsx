import React, { useEffect, useState } from "react";
import EmployeeCard from "@/components/employee/EmployeeCard";
import { AddEmployeeDailog } from "@/components/employee/AddEmployeeDailog";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";
import UpdateEmployeeDialog from "@/components/employee/UpdateEmployeeDialog";

const EmployeePage = () => {
  const [adminData, setAdminData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.role === "Admin") {
        setShowAddEmployeeDialog(true);
      }
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosApi.get("/users/getAll");
      const data = res.data.result;
      const adminData = data.filter((user) => user.role === "Admin");
      const userData = data.filter((user) => user.role === "User");
      setAdminData(adminData);
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch employee data");
    }
  };

  return (
    <div className="p-6 w-[80vw] ">
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
              fetchData={fetchData}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        {showAddEmployeeDialog && <AddEmployeeDailog fetchData={fetchData} />}
      </div>
      {isDialogOpen && (
        <UpdateEmployeeDialog
          employee={selectedEmployee}
          fetchData={fetchData}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
};

export default EmployeePage;
