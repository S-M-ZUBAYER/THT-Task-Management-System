import { Calendar } from "lucide-react";
import AddTask from "./AddTask";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useUserData } from "@/hook/useUserData";

export const TaskListTable = ({ taskData }) => {
  const { admin } = useUserData();
  const navigate = useNavigate();
  const handleTaskDetails = (taskId) => {
    navigate("/task-details", { state: { id: taskId } });
  };
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold mb-4 text-[#1A1A1A]">All tasks</h3>
        {admin && <AddTask />}
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
            {Array.isArray(taskData) && taskData.length > 0 ? (
              taskData.map((task) => {
                const { taskInfo } = task;

                return (
                  <tr
                    key={taskInfo.id}
                    className="border-b cursor-pointer"
                    onClick={() => handleTaskDetails(taskInfo.id)}
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

                    <td className="flex justify-center items-center p-2">
                      <div className="flex">
                        {Array.isArray(taskInfo.assigned_employee_ids) &&
                          taskInfo.assigned_employee_ids.map(
                            ({ image }, idx) => (
                              <img
                                key={idx}
                                src={image}
                                alt="Employee"
                                className="w-6 h-6 rounded-full border-2 border-white -ml-1"
                              />
                            )
                          )}
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
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
