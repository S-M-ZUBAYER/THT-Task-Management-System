import { Calendar } from "lucide-react";
import AddTask from "./AddTask";
import { format } from "date-fns";
import { useTaskStore } from "@/Zustand";
import { useNavigate } from "react-router-dom";

export const TaskListTable = ({ taskData }) => {
  const { setTask } = useTaskStore();
  const navigate = useNavigate();
  const handleTaskDetails = (task) => {
    setTask(task);
    navigate("/task-details", { replace: true });
  };
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold mb-4 text-[#1A1A1A]">All tasks</h3>
        <AddTask />
      </div>
      <div className="overflow-auto bg-[#FDFBFF] rounded-lg ">
        <table className="w-full text-sm  text-center">
          <thead className="text-muted-foreground border-b">
            <tr className="text-[#004368]">
              <th className="p-2">Name</th>
              <th>
                <div className="flex text-[#004368] justify-center items-center gap-1.5">
                  <Calendar className="w-4 h-4 " />
                  <p>Start date</p>
                </div>
              </th>
              <th>
                <div className="flex text-[#004368] justify-center items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <p>End Date</p>
                </div>
              </th>
              <th className="p-2">Assigned on</th>
              <th className="p-2">Resources</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((task, i) => {
              const { taskInfo } = task;
              return (
                <tr
                  key={i}
                  className="border-b cursor-pointer"
                  onClick={() => handleTaskDetails(task)}
                >
                  <td className="p-2">{taskInfo.task_title}</td>
                  <td className="p-2">
                    {format(
                      new Date(taskInfo.task_starting_time),
                      "yyyy-MM-dd"
                    )}
                  </td>
                  <td className="pl-5">
                    {format(new Date(taskInfo.task_deadline), "yyyy-MM-dd")}
                  </td>
                  <td className="flex justify-center items-center">
                    <div className="flex">
                      {taskInfo.assigned_employee_ids.map(({ image }, i) => (
                        <img
                          key={i}
                          src={image}
                          className="w-6 h-6 rounded-full border-2 border-white -ml-1"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-2">Resources</td>
                  <td className="p-2">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {taskInfo.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
