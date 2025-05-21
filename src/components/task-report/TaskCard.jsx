export default function TaskCard({ name, tasks }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2 text-sm font-medium">
        <img
          src="https://i.pravatar.cc/150?img"
          alt="image"
          className="w-7 h-7 rounded-full"
        />
        <span>{name}</span>
      </div>
      <ol className="list-decimal text-sm text-gray-700 pl-5 mt-5">
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ol>
    </div>
  );
}
