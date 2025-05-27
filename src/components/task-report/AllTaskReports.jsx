import UserCard from "./UserCard";

export default function AllTaskReports() {
  const allReports = [
    { name: "Dolon Mondal" },
    { name: "Md G R Pias" },
    { name: "Mir Sultan" },
    { name: "Dolon Mondal" },
    { name: "Md G R Pias" },
    { name: "Mir Sultan" },
    { name: "Dolon Mondal" },
    { name: "Md G R Pias" },
    { name: "Mir Sultan" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h2 className="font-semibold text-lg mb-4">All Task Reports</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allReports.map((user, idx) => (
          <UserCard key={idx} name={user.name} />
        ))}
      </div>
    </div>
  );
}
