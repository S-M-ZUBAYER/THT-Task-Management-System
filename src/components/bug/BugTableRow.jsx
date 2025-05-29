import UserAvatars from "./UserAvatars";
import StatusDropdown from "./StatusDropdown";
import icons from "@/constants/icons";

export default function BugTableRow({ bug }) {
  const {
    BugDetails = "",
    findDate,
    solveDate,
    assignWith = [],
    priority = "N/A",
    attachmentFile = "#",
    status = "Open",
    id,
  } = bug;

  return (
    <tr className="border-b hover:bg-muted transition-colors">
      <td className="px-4 py-3 max-w-xs truncate" title={BugDetails}>
        {BugDetails}
      </td>

      <td className="px-4 py-3 whitespace-nowrap">
        {findDate ? new Date(findDate).toLocaleDateString() : "—"}
      </td>

      <td className="px-4 py-3 whitespace-nowrap">
        {solveDate ? new Date(solveDate).toLocaleDateString() : "—"}
      </td>

      <td className="px-4 py-3">
        <UserAvatars users={assignWith} />
      </td>

      <td className="px-4 py-3 capitalize">{priority}</td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="truncate max-w-[100px]" title="Bug report">
            Bug report
          </span>
          <a
            href={attachmentFile}
            download={attachmentFile.split("/").pop() || "attachment"}
            aria-label="Download attachment"
          >
            <img src={icons.Download} alt="Download icon" className="w-5 h-5" />
          </a>
        </div>
      </td>

      <td className="px-4 py-3">
        <StatusDropdown current={status} id={id} />
      </td>
    </tr>
  );
}
