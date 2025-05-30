import { TaskListTable } from "@/components/task/TaskListTable";
import { CalendarPanel } from "@/components/task/CalendarPanel";
import { ResourcesPanel } from "@/components/task/ResourcesPanel";
import TaskCardProvider from "@/components/task/TaskCardProvider";
import { useEffect, useState } from "react";
import { axiosApi } from "@/lib/axiosApi";

export default function TaskPage() {
  const [taskData, setTaskData] = useState([]);
  useEffect(() => {
    getTaskData();
  }, []);
  const getTaskData = async () => {
    const res = await axiosApi.get("/all-task-details/getAll");
    setTaskData(res.data.data);
  };
  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 px-[5vw] ">
      <div className="col-span-2">
        <TaskCardProvider />

        <div className="mt-6">
          <TaskListTable taskData={taskData} fetchData={getTaskData} />
        </div>
      </div>
      <div className="space-y-6">
        <CalendarPanel />
        <ResourcesPanel />
      </div>
    </div>
  );
}
