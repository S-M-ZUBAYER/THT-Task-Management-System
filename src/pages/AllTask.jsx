import React, { useEffect, useState, useMemo } from "react";
import Card from "@/components/Card";
import { axiosApi } from "@/lib/axiosApi";
import Loader from "@/components/Loader";
import CustomPagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 12;

const AllTask = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allTask, setAllTask] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axiosApi.get("/ProjectListWithTasks");
        const data = response?.data?.result.sort((a, b) => {
          return new Date(b.id) - new Date(a.id);
        });
        console.log(data);
        if (!data || data.length === 0) {
          console.warn("No bugs found in the response.");
          setAllTask([]);
          return;
        }
        setAllTask(data);
      } catch (error) {
        console.error("Error fetching bugs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  const totalPages = Math.ceil(allTask.length / ITEMS_PER_PAGE);

  const paginatedBugs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allTask.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, allTask]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="w-[75vw] max-w-[80vw] px-6 py-8 mx-auto">
      {loading ? (
        <div className="w-[75vw] h-[67vh] flex justify-center items-center ">
          <Loader />
        </div>
      ) : allTask.length === 0 ? (
        <p className="text-gray-500 text-sm">No bugs found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
            {paginatedBugs.map((data, index) => (
              <Card key={index} {...data} />
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <CustomPagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default AllTask;
