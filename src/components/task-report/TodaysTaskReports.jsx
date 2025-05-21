import { AddTaskReport } from "./AddTaskReport";
import TaskReportPagination from "./Pagination";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

export default function TodaysTaskReports() {
  const todayTasks = Array(3).fill({
    name: "Dolon Mondal",
    tasks: [
      "Software Bug List – Common bugs in apps or websites (e.g., UI glitches, crashes, security flaws).",
      "Programming Bug List – Frequent coding mistakes in languages like Python, JavaScript, etc.",
      "Bug/Insect List – A list of real-world insects (e.g., beetles, ants, mosquitoes).",
      "Game Bug List – Known bugs/glitches in a specific game.",
      "Device Bug List – Issues in a particular phone, laptop, or operating system.",
    ],
  });

  return (
    <div className="bg-white p-6 rounded-xl border mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-[#004368] ">
          Todays Task Reports
        </h2>
        <AddTaskReport />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todayTasks.map((task, idx) => (
          <TaskCard key={idx} {...task} />
        ))}
      </div>

      <div className="flex justify-end mt-4 space-x-2 text-sm text-gray-500">
        <TaskReportPagination />
      </div>
    </div>
  );
}
