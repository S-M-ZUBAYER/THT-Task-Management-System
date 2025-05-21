export default function StatusDropdown({ current }) {
  return (
    <select className="border rounded-md px-2 py-1 text-sm bg-white">
      <option selected={current === "Solved"}>Solved</option>
      <option selected={current === "In progress"}>In progress</option>
      <option selected={current === "Not started"}>Not started</option>
    </select>
  );
}
