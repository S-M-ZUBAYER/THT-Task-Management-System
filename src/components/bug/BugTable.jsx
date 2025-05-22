import BugTableRow from "./BugTableRow";
import { Clock } from "../svg/svg";
import icons from "@/constants/icons";

const bugData = [
  {
    name: "App not responding",
    findDate: "20 May 2025",
    solveDate: "25 May 2025",
    solvedBy: ["👤", "👥", "🧑‍💻"],
    priority: "Urgent",
    attachment: "Bug report",
    status: "Solved",
  },
  {
    name: "Login issues",
    findDate: "21 May 2025",
    solveDate: "26 May 2025",
    solvedBy: ["👤", "👥", "🧑‍💻"],
    priority: "High",
    attachment: "Bug report",
    status: "In progress",
  },
  // Add more bugs here...
];

export default function BugTable() {
  return (
    <div className="overflow-x-auto rounded-lg  ">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className=" text-[#004368] text-sm ">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3 ">
              <div className="flex items-center gap-2">
                <img src={icons.Event} alt="icon" className="w-4 h-4" />
                <p>Find date</p>
              </div>
            </th>
            <th className="px-4 py-3 ">
              <div className="flex items-center gap-2">
                <img src={icons.Event} alt="icon" className="w-4 h-4" />
                <p>Solve date</p>
              </div>
            </th>
            <th className="px-4 py-3">Solved by</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Attachments</th>
            <th className="px-4 py-3 pl-7">Status</th>
          </tr>
        </thead>
        <tbody>
          {bugData.map((bug, index) => (
            <BugTableRow key={index} {...bug} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
