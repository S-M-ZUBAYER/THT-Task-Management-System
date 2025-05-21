import BugTableRow from "./BugTableRow";

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
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Find date</th>
            <th className="px-4 py-3">Solve date</th>
            <th className="px-4 py-3">Solved by</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Attachments</th>
            <th className="px-4 py-3">Status</th>
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
