import UserAvatars from "./UserAvatars";
import StatusDropdown from "./StatusDropdown";

export default function BugTableRow({
  name,
  findDate,
  solveDate,
  solvedBy,
  priority,
  attachment,
  status,
}) {
  return (
    <tr className="">
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">{findDate}</td>
      <td className="px-4 py-3">{solveDate}</td>
      <td className="px-4 py-3">
        <UserAvatars users={solvedBy} />
      </td>
      <td className="px-4 py-3">{priority}</td>
      <td className="px-4 py-3">{attachment}</td>
      <td className="px-4 py-3">
        <StatusDropdown current={status} />
      </td>
    </tr>
  );
}
