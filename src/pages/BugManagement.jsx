import React, { useEffect, useState } from "react";
import BugCard from "@/components/BugCard";
import { axiosApi } from "@/lib/axiosApi";
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
        console.error("Error fetching bugs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  return (
    <section className="w-[75vw] max-w-[80vw] px-6 py-8 mx-auto">
      <h2 className="font-semibold text-lg text-[#004368]">Bugs & solution</h2>

      {loading ? (
        <div className="w-[75vw] h-[67vh] flex justify-center items-center ">
          <Loader />
        </div>
      ) : bugsList.length === 0 ? (
        <p className="text-gray-500 text-sm">No bugs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto mt-5">
          {bugsList.map((bugData, index) => (
            <BugCard key={index} {...bugData} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BugManagement;
