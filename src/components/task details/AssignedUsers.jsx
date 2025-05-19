const AssignedUsers = () => {
  const avatars = [
    "https://i.pravatar.cc/150?img=joy",
    "https://i.pravatar.cc/150?img=moy",
    "https://i.pravatar.cc/150?img=zoy",
    "https://i.pravatar.cc/150?img=goy",
    "https://i.pravatar.cc/150?img=roy",
  ];

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-[#004368]">Task Assigned On</h3>
      <div className="flex -space-x-3">
        {avatars.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`user-${index}`}
            className="w-9 h-9 rounded-full border-2 border-white"
          />
        ))}
      </div>
    </div>
  );
};

export default AssignedUsers;
