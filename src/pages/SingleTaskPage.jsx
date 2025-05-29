import TaskHeader from "@/components/task details/TaskHeader";
import TaskDetails from "@/components/task details/TaskDetails";
import DiscussionList from "@/components/task details/DiscussionList";
import ResourceList from "@/components/task details/ResourceList";
import TaskStatus from "@/components/task details/TaskStatus";
import AssignedUsers from "@/components/task details/AssignedUsers";
import { Clock } from "@/components/svg/svg";
import { useTaskStore } from "@/Zustand/useTaskStore";
import { useEffect } from "react";
import { format } from "date-fns";

const SingleTaskPage = () => {
  const { task } = useTaskStore();
  useEffect(() => {
    console.log(task);
  }, [task]);
  const resources = [
    { name: "Figma file of Grozziie app UI Design", date: "01 June 2025" },
    { name: "Resource of Desktop app", date: "05 June 2025" },
    { name: "Prototype of Mobile app", date: "10 June 2025" },
    { name: "User research findings", date: "15 June 2025" },
    { name: "Style guide documentation", date: "20 June 2025" },
    { name: "Accessibility audit report", date: "25 June 2025" },
    { name: "Usability testing results", date: "30 June 2025" },
    { name: "Marketing strategy outline", date: "05 July 2025" },
  ];

  const testReports = resources.slice(0, 5);

  return (
    <div className=" w-[80vw] px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <TaskHeader TaskHeader={task.taskInfo.task_title} />
          <TaskDetails TaskDetail={task.taskInfo.task_details} />
          <div>
            <h3 className="font-semibold mb-2 text-[#004368]">Time</h3>
            <div className="text-sm text-gray-600 flex gap-4">
              <div className="flex items-center gap-2">
                <Clock Stock={"#202020"} />
                <p className="text-[#202020]">
                  Start date:{" "}
                  {format(task.taskInfo.task_starting_time, "MMMM d, yyyy")}{" "}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock Stock={"#FF0000"} />
                <p className="text-[#FF0000]">
                  Deadline:{" "}
                  {format(task.taskInfo.task_deadline, "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
          <AssignedUsers assign={task.taskInfo.assigned_employee_ids} />
          <TaskStatus />
          <DiscussionList discussions={task.discussions} />
        </div>

        <div className="space-y-6">
          <ResourceList title="Resources" items={resources} />
          <ResourceList title="Test Reports Documents" items={testReports} />
        </div>
      </div>
    </div>
  );
};

export default SingleTaskPage;
