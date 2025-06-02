import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { X, Plus, Edit } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import DatePicker from "../DatePicker";
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";
import useTaskColumns from "@/hook/useTasksData";
import { useTaskStore } from "@/Zustand/useTaskStore";
import useTaskData from "../../hook/useTaskData";

const schema = z.object({
  task_title: z.string().min(3, "Task title is required"),
  task_details: z.string().min(3, "Bug details required"),
  status: z.enum(["To Do", "In Progress", "Completed"]),
  assigned_employee_ids: z.array(z.string()).optional(),
  task_starting_time: z.union([z.date(), z.string().datetime()]).optional(),
  task_deadline: z.union([z.date(), z.string().datetime()]).optional(),
});

const UpdateTask = () => {
  const { fetchTasks } = useTaskColumns();
  const { task } = useTaskStore();
  const { taskInfo } = task;
  const { fetchTaskById } = useTaskData();
  const [isOpen, setIsOpen] = useState(false);
  const [showSolvers, setShowSolvers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [solvers, setSolvers] = useState(
    taskInfo?.assigned_employee_ids?.map((u) => u.id) || []
  );
  const [solversData, setSolversData] = useState([]);
  const modalRef = useRef(null);

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

  useEffect(() => {
    if (isOpen) {
      form.reset({
        task_title: taskInfo.task_title,
        task_details: taskInfo.task_details,
        task_starting_time: taskInfo.task_starting_time,
        task_deadline: taskInfo.task_deadline,
        status: taskInfo.status,
      });
    }
  }, [isOpen]);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      task_title: taskInfo?.task_title || "",
      task_details: taskInfo?.task_details || "",
      task_starting_time: taskInfo?.task_starting_time
        ? new Date(taskInfo.task_starting_time)
        : undefined,
      task_deadline: taskInfo?.task_deadline
        ? new Date(taskInfo.task_deadline)
        : undefined,
      status: taskInfo?.status || "To Do",
    },
  });

  const toggleModal = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      requestAnimationFrame(() => {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      });
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsOpen(false),
      });
    }
  }, [isOpen]);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      console.log(values);
      const startingTime =
        values.task_starting_time === undefined
          ? new Date(taskInfo.task_starting_time)
          : values.task_starting_time.toISOString();

      const deadline =
        values.task_deadline === undefined
          ? taskInfo.task_deadline
          : values.task_deadline.toISOString();

      const submissionData = {
        ...values,
        task_starting_time: startingTime,
        task_deadline: deadline,
        task_completing_date: null,
        assigned_employee_ids: solvers,
      };
      console.log(submissionData);
      const res = await axiosApi.post(
        `/tasks/update/${taskInfo.id}`,
        submissionData
      );
      console.log(res.data);

      toggleModal();
      form.reset();
      setSolvers([]);
      toast.success("Task updated successfully!");
      fetchTasks();
      fetchTaskById();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task. Please try again.");
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
        <Edit className="w-4 h-4" aria-hidden="true" />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent backdrop-blur-sm bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl relative space-y-6"
          >
            <div
              onClick={toggleModal}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-gray-600" aria-hidden="true" />
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project name
                </label>
                <Input
                  {...form.register("task_title")}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    color: "#004368",
                  }}
                />
                {form.formState.errors.task_title && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.task_title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="block font-medium text-gray-700"
                >
                  Project Requirements
                </label>
                <textarea
                  id="task_details"
                  rows={4}
                  {...form.register("task_details")}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="project requirements here..."
                />
                {form.formState.errors.task_details && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.task_details.message}
                  </p>
                )}
              </div>

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
                    className="w-full mt-1 border-[#B0C5D0]"
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
                            alt={`Solver ${idx + 1}`}
                            className="w-8 h-8 rounded-full border border-gray-300"
                          />
                        );
                      })
                    )}
                    <div
                      onClick={() => setShowSolvers(true)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
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
                          type="checkbox"
                          checked={solvers.includes(solver.id)}
                          onChange={(e) =>
                            setSolvers((prev) =>
                              e.target.checked
                                ? [...prev, solver.id]
                                : prev.filter((id) => id !== solver.id)
                            )
                          }
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setShowSolvers(false)}
                      className="bg-[#E6ECF0] text-[#004368] hover:text-[#003050] mt-2 text-sm font-medium transition-colors px-3 py-1 rounded-md"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full  text-white py-2 rounded-md hover:bg-[#003050] transition-colors focus:ring-4 focus:ring-blue-300"
                style={{ backgroundColor: "#004368" }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
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
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Updating...
                  </div>
                ) : (
                  "Update Task"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTask;
