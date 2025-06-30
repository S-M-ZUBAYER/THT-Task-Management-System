import { ProjectTables } from "@/components/project/ProjectTables";
import { CalendarPanel } from "@/components/task/CalendarPanel";

const taskData = [
  {
    taskInfo: {
      id: "1",
      task_title: "UI Design",
      task_starting_time: "2025-06-25T09:00:00Z",
      task_deadline: "2025-06-30T17:00:00Z",
      assigned_employee_ids: [
        {
          image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          image: "https://randomuser.me/api/portraits/women/2.jpg",
        },
      ],
      status: "In Progress",
    },
  },
  {
    taskInfo: {
      id: "2",
      task_title: "Backend API Development",
      task_starting_time: "2025-06-20T10:00:00Z",
      task_deadline: "2025-07-05T18:00:00Z",
      assigned_employee_ids: [
        {
          image: "https://randomuser.me/api/portraits/men/3.jpg",
        },
      ],
      status: "Pending",
    },
  },
  {
    taskInfo: {
      id: "3",
      task_title: "Testing & QA",
      task_starting_time: "2025-07-01T10:00:00Z",
      task_deadline: "2025-07-10T18:00:00Z",
      assigned_employee_ids: [],
      status: "Not Started",
    },
  },
];

function AllProject() {
  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 px-[5vw] w-[80vw] ">
      <div className="col-span-2">
        <ProjectTables taskData={taskData} loading={false} />
      </div>
      <div className="space-y-6">
        <CalendarPanel />
        {/* <ResourcesPanel task={tasks} /> */}
      </div>
    </div>
  );
}

export default AllProject;
