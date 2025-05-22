import { Calendar } from "lucide-react";

export const TaskListTable = () => {
  const tasks = [
    {
      name: "Task on mobile app development",
      start: "01 Jan 2025",
      end: "10 Oct 2025",
      assigned: 5,
      status: "Progress",
    },
    {
      name: "Task on Desktopapp development",
      start: "15 Feb 2025",
      end: "20 Nov 2025",
      assigned: 4,
      status: "Progress",
    },
    // ...more rows
  ];

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="text-sm font-semibold mb-4 text-[#1A1A1A]">All tasks</h3>
      <div className="overflow-auto bg-[#FDFBFF] rounded-lg ">
        <table className="w-full text-sm text-left">
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
            {tasks.map((t, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.start}</td>
                <td className="pl-5">{t.end}</td>
                <td className="p-2">
                  <div className="flex">
                    {[...Array(t.assigned)].map((_, i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/150?img=${i + 5}`}
                        className="w-6 h-6 rounded-full border-2 border-white -ml-1"
                      />
                    ))}
                  </div>
                </td>
                <td className="p-2">Resources</td>
                <td className="p-2">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
