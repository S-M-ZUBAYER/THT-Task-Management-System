export default function BugHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">Bug Reports</h2>
      <select className="mt-2 md:mt-0 border border-gray-300 rounded-md px-3 py-1 text-sm">
        <option>1 week</option>
        <option>2 weeks</option>
        <option>1 month</option>
      </select>
    </div>
  );
}
