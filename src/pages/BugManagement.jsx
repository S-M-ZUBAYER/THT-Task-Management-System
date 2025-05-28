import React, { useEffect, useState } from "react";
import BugCard from "@/components/BugCard";
import { axiosApi } from "@/lib/axiosApi";

const BugManagement = () => {
  const [bugsList, setBugsList] = useState([]);
  useEffect(() => {
    const fetchBugs = async () => {
      const res = await axiosApi.get(
        "https://grozziie.zjweiting.com:57683/tht/taskManagement/api/projectBug/with-bugs/getAll"
      );
      setBugsList(res.data.result);
    };
    fetchBugs();
  }, []);
  return (
    <section className="w-[80vw] px-10 py-8">
      <p className="text-[28px] font-semibold leading-[150%] text-[#004368] font-poppins mb-6">
        Bug’s & Solutions
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bugsList.map((bugData, index) => (
          <BugCard key={index} {...bugData} />
        ))}
      </div>
    </section>
  );
};

export default BugManagement;
