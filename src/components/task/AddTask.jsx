import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import DatePicker from "../DatePicker";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";
import useTaskColumns from "@/hook/useTasksData";
import { useWebSocket } from "@/hook/useWebSocket";
import { useUserData } from "@/hook/useUserData";
import { format } from "date-fns";

const schema = z.object({
  task_title: z.string().min(3, "Task title is required"),
  task_details: z.string().min(3, "Bug details required"),
  task_starting_time: z.date({ required_error: "Date is required" }),
  status: z.enum(["To Do", "In Progress", "Completed"]),
  assigned_employee_ids: z.array(z.string()).optional(),
});

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSolvers, setShowSolvers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [solvers, setSolvers] = useState([]);
  const [solversData, setSolversData] = useState([]);
  const modalRef = useRef(null);
  const { fetchTasks } = useTaskColumns();
  const { sendMessage } = useWebSocket();
  const { user } = useUserData();

  useEffect(() => {
    const fetchSolvers = async () => {
      try {
        const response = await axiosApi.get("/users/getAll");
        const data = response.data.result.map((employee) => ({
          id: employee.id,
          src: employee.image || "/default-profile.png",
        }));
        setSolversData(data);
      } catch (error) {
        console.error("Failed to fetch solvers:", error);
        toast.error("Failed to load solvers. Please try again later.");
      }
    };
    fetchSolvers();
  }, []);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      task_title: "",
      task_details: "",
      task_starting_time: new Date(),
      task_deadline: undefined,
      status: "To Do",
      assigned_employee_ids: [],
    },
  });

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const submissionData = {
        ...values,
        task_starting_time: values.task_starting_time.toISOString(),
        task_deadline: values?.task_deadline?.toISOString(),
        task_completing_date: null,
        assigned_employee_ids: solvers,
      };
      const res = await axiosApi.post("/tasks/Create", submissionData);
      toast.success("Task created successfully!");
      try {
        const taskMessage = `<strong>Task Status:</strong><p>New bug waiting for you</p>`;
        sendMessage({
          type: "notify_specific",
          userIds: solvers.map(String),
          message: taskMessage,
          name: user.name.trim(),
          date: format(new Date(), "MM-dd-yyyy"),
          path: `/task-details/${res.data.result.insertId}`,
        });
      } catch (error) {
        console.error("Failed to send notification:", error);
        toast.error("Failed to send notification. Please try again later.");
      }
      toggleModal();
      form.reset();
      setSolvers([]);
      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={toggleModal}
        className="flex items-center justify-center text-[#004368] bg-[#E6ECF0] hover:bg-[#D6E6F0] focus:ring-4 focus:ring-blue-300 font-medium rounded-full p-3 transition-colors"
        aria-label="Add new bug"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </div>

      {/* Modal */}
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent backdrop-blur-sm bg-opacity-50"
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl relative space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onClick={toggleModal}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-gray-600" aria-hidden="true" />
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project name
                </label>
                <input
                  {...form.register("task_title")}
                  className="border border-[#d8d4d4ee] rounded py-1.5 px-0.5 w-full outline-none "
                />
                {form.formState.errors.task_title && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.task_title.message}
                  </p>
                )}
              </div>

              {/* Task Details */}
              <div>
                <label
                  htmlFor="task_details"
                  className="block font-medium text-gray-700"
                >
                  Project Requirements
                </label>
                <textarea
                  id="task_details"
                  rows={4}
                  {...form.register("task_details")}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Project requirements here..."
                />
                {form.formState.errors.task_details && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.task_details.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="flex gap-4 w-full">
                <div className="w-1/2">
                  <DatePicker
                    form={form}
                    name="task_starting_time"
                    label="Start Date"
                  />
                </div>
                <div className="w-1/2">
                  <DatePicker
                    form={form}
                    name="task_deadline"
                    label="End Date"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block font-medium text-gray-700"
                >
                  Status
                </label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(val) =>
                    form.setValue("status", val, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    id="status"
                    className="w-full mt-1 border-[#B0C5D0] focus:ring-[#004368] focus:border-[#004368]"
                    style={{
                      backgroundColor: "transparent",
                      outline: "none",
                      color: "#2B2B2B",
                      font: "inherit",
                      border: "1px solid #B0C5D0",
                      boxShadow: "none",
                    }}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assign Task to */}
              <div>
                <h4 className="font-medium text-gray-700">Assign task to</h4>

                {!showSolvers ? (
                  <div className="flex items-center gap-2 mt-2">
                    {solvers.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No solvers selected
                      </p>
                    ) : (
                      solvers.map((id, idx) => {
                        const solver = solversData.find((s) => s.id === id);
                        if (!solver) return null;

                        return (
                          <img
                            key={idx}
                            src={solver.src}
                            alt={`Selected solver ${idx + 1}`}
                            className="w-8 h-8 rounded-full border border-gray-300"
                          />
                        );
                      })
                    )}

                    <div
                      onClick={() => setShowSolvers(true)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                      aria-label="Add solvers"
                    >
                      <Plus
                        className="w-4 h-4 text-gray-600"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {solversData.map((solver) => (
                      <div key={solver.id} className="flex items-center gap-2">
                        <img
                          src={solver.src}
                          alt={`Solver ${solver.id}`}
                          className="w-8 h-8 rounded-full border border-gray-300"
                        />
                        <input
                          id={`checkbox-${solver.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded-sm focus:ring-blue-500"
                          checked={solvers.includes(solver.id)}
                          onChange={(e) => {
                            setSolvers((prev) =>
                              e.target.checked
                                ? [...prev, solver.id]
                                : prev.filter((id) => id !== solver.id)
                            );
                          }}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setShowSolvers(false)}
                      className="text-[#004368] hover:text-[#003050] mt-2 text-sm font-medium transition-colors"
                      style={{ backgroundColor: "#E6ECF0" }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#004368] text-white py-2 rounded-md hover:bg-[#003050] transition-colors focus:ring-4 focus:ring-blue-300"
                style={{ backgroundColor: "#004368" }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-3 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                      />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Bug Details"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default AddTask;
