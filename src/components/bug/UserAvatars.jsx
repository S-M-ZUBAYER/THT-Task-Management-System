export default function UserAvatars({ users }) {
  return (
    <div className="flex -space-x-2">
      {users.map((u, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full bg-gray-200 text-xs flex items-center justify-center border-2 border-white"
        >
          {u}
        </div>
      ))}
    </div>
  );
}
