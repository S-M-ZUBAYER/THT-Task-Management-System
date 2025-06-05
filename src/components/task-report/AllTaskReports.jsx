import { useEmployeeData } from "@/hook/useEmployeeData";
import UserCard from "./UserCard";

export default function AllTaskReports() {
  const { userData } = useEmployeeData();

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h2 className="font-semibold text-lg mb-4">All Task Reports</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData.map((user, idx) => (
          <UserCard key={idx} name={user.name} image={user.image} />
        ))}
      </div>
    </div>
  );
}
