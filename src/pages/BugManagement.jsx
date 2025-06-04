import React, { useEffect, useState } from "react";
import BugCard from "@/components/BugCard";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const BugManagement = () => {
  const [bugsList, setBugsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axiosApi.get(
          "https://grozziie.zjweiting.com:57683/tht/taskManagement/api/projectBug/with-bugs/getAll"
        );
        setBugsList(response?.data?.result || []);
      } catch (error) {
        toast.error("Failed to fetch bugs");
        console.error("Error fetching bugs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  return (
    <section className="w-[75vw] max-w-[80vw] px-6 py-8 mx-auto">
      <h1 className="text-[28px] font-semibold leading-[150%] text-[#004368] font-poppins mb-6">
        Bugs & Solutions
      </h1>

      {loading ? (
        <div className="w-[75vw] h-[67vh] flex justify-center items-center ">
          <Loader />
        </div>
      ) : bugsList.length === 0 ? (
        <p className="text-gray-500 text-sm">No bugs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
          {bugsList.map((bugData, index) => (
            <BugCard key={index} {...bugData} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BugManagement;
