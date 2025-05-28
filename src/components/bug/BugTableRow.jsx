import UserAvatars from "./UserAvatars";
import StatusDropdown from "./StatusDropdown";
import icons from "@/constants/icons";

export default function BugTableRow({ bug }) {
  return (
    <tr className="">
      <td className="px-4 py-3">{bug.projectName}</td>
      <td className="px-4 py-3">
        {new Date(bug.findDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        {new Date(bug.solveDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <UserAvatars users={bug.assignWith} />
      </td>
      <td className="px-4 py-3">{bug.priority}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <p>Bug report</p>
          <a href={bug.attachments} download="orders_export.csv">
            <img src={icons.Download} alt="download" className="w-6" />
          </a>
        </div>
      </td>
      <td className="px-4 py-3">
        <StatusDropdown current={bug.status} />
      </td>
    </tr>
  );
}
