import React from "react";

const columns = [
  {
    title: "To Do",
    color: "bg-purple-100",
    headerColor: "bg-purple-200",
    emoji: "🗂️",
  },
  {
    title: "In Progress",
    color: "bg-red-100",
    headerColor: "bg-red-200",
    emoji: "🔴",
  },
  {
    title: "Completed",
    color: "bg-green-100",
    headerColor: "bg-green-200",
    emoji: "✅",
  },
];

const Card = () => (
  <div className="bg-white rounded-xl border p-4 shadow-sm space-y-3">
    <div className="text-xs text-purple-600 font-bold">PROJECT</div>
    <h3 className="font-semibold">Task name</h3>
    <p className="text-sm text-gray-500">
      Create a high-fidelity UI for the landing page following brand guidelines.
      Include a hero section, features block, testimonials, and CTA buttons.
      Collaborate with the content and marketing teams for copy and assets.
    </p>
    <div className="text-sm text-red-500 font-medium">
      🕒 Deadline: May 12, 2025
    </div>
    <div className="flex -space-x-2">
      {[1, 2, 3, 4].map((_, i) => (
        <img
          key={i}
          className="w-8 h-8 rounded-full border-2 border-white"
          src={`https://i.pravatar.cc/150?img=${i + 5}`}
          alt="Avatar"
        />
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-transparent pr-15">
      {columns.map((col, idx) => (
        <div key={idx} className="space-y-4">
          <div className={`p-4 rounded-xl ${col.headerColor}`}>
            <h2 className="text-md font-semibold flex items-center gap-2">
              {col.emoji} {col.title}
            </h2>
          </div>
          <Card />
          <Card />
          <Card />
        </div>
      ))}
    </div>
  );
};

export default Home;
