import { useState } from "react";
import { Plus } from "lucide-react";
import { useUserData } from "@/hook/useUserData";
import toast from "react-hot-toast";
import { axiosApi } from "@/lib/axiosApi";
import { motion, AnimatePresence } from "framer-motion";
import { useTaskReportData } from "@/hook/useTaskReportData";
import { useWebSocket } from "@/hook/useWebSocket";
import { format } from "date-fns";

export function AddTaskReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetails] = useState("");
  const { user } = useUserData();
  const { getTasksReport } = useTaskReportData();
  const { sendMessage } = useWebSocket();

  const handleAddTaskReport = async () => {
    if (!detail.trim()) {
      toast.error("Task report details cannot be empty.");
      return;
    }

    try {
      const payload = {
        employeeName: user.name,
        employeeEmail: user.email,
        image: user.image,
        employeeId: `${user.id}`,
        reportDetails: detail,
        reportDate: new Date().toISOString().split("T")[0],
      };
      await axiosApi.post("/dailyTaskReport/create", payload);
      toast.success("Task Report submitted successfully.");
      try {
        sendMessage({
          type: "notify_admins",
          message: `New Task Report submitted by ${user.name}`,
          name: user.name.trim(),
          date: format(new Date(), "MM-dd-yyyy"),
          path: `/Reports/${user.email}/${user.name.trim()}`,
        });
      } catch (error) {
        console.error("Error updating bug status:", error);
        toast.error(
          error.response?.data?.message || "Failed to notify  Task Report"
        );
      }
      setIsOpen(false);
      setDetails("");
      getTasksReport();
    } catch (error) {
      toast.error("Failed to submit Task Report.");
      console.error(error);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="block text-[#004368] bg-[#E6ECF0] hover:bg-[#d8e2ea] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{
              transition: { duration: 1 },
              opacity: 1,
            }}
            exit={{ transition: { duration: 1 }, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-transparent bg-opacity-40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative p-4 w-full max-w-[40vw]"
            >
              <div className="relative bg-white rounded-lg shadow px-4">
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </div>

                <div className="p-5 text-center">
                  <h3 className="mb-5 text-lg font-bold text-[#004368]">
                    Today's Task Report
                  </h3>

                  <div className="text-start mb-4">
                    <p className="text-[#2B2B2B] mb-1">Employee Name</p>
                    <p className="text-[#004368] font-semibold">
                      {user?.name || "N/A"}
                    </p>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Write your task report
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      value={detail}
                      onChange={(e) => setDetails(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Task Report..."
                      style={{ outline: "none" }}
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <div
                      onClick={handleAddTaskReport}
                      className="text-white bg-[#004368] hover:bg-[#4a6777] font-medium rounded-lg text-sm px-6 py-2.5"
                    >
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
