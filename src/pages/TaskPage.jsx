import { TaskListTable } from "@/components/task/TaskListTable";
import { CalendarPanel } from "@/components/task/CalendarPanel";
import { ResourcesPanel } from "@/components/task/ResourcesPanel";
import TaskCardProvider from "@/components/task/TaskCardProvider";
import useTaskColumns from "@/hook/useTasksData";

export default function TaskPage() {
  const { tasks, loading } = useTaskColumns();
  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 px-[5vw] w-[80vw] ">
      <div className="col-span-2">
        <TaskCardProvider task={tasks} />

        <div className="mt-6">
          <TaskListTable taskData={tasks} loading={loading} />
        </div>
      </div>
      <div className="space-y-6">
        <CalendarPanel />
        <ResourcesPanel task={tasks} />
      </div>
    </div>
  );
}
