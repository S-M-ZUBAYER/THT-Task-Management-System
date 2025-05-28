import BugTableRow from "./BugTableRow";
import icons from "@/constants/icons";
import { useBugStore } from "@/Zustand";

export default function BugTable() {
  const { bugs } = useBugStore();
  console.log(bugs);

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
          {bugs.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No bugs found.
              </td>
            </tr>
          ) : (
            bugs.map((bug) => <BugTableRow key={bug.id} bug={bug} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
