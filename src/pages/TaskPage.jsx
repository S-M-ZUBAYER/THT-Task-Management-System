import { TaskListTable } from "@/components/task/TaskListTable";
import { CalendarPanel } from "@/components/task/CalendarPanel";
import { ResourcesPanel } from "@/components/task/ResourcesPanel";
import TaskCardProvider from "@/components/task/TaskCardProvider";

export default function TaskPage() {
  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 px-[5vw] ">
      {/* Task Cards */}
      <div className="col-span-2">
        <TaskCardProvider />

        <div className="mt-6">
          <TaskListTable />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <CalendarPanel />
        <ResourcesPanel />
      </div>
    </div>
  );
}
