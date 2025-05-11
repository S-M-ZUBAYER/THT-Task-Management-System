import React from "react";
import { EllipsisVertical } from "lucide-react";

const columns = [
  {
    title: "To Do",
    color: "bg-[#F0E6FF] ",
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
  <div className="bg-white rounded-xl border-[#E8D9FF] border p-4  space-y-3">
    <div className="text-xs text-purple-600 font-bold flex justify-between">
      <p>Project</p>
      <EllipsisVertical />
    </div>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mr-15">
      {columns.map((col, idx) => (
        <div key={idx} className="space-y-4 shadow-sm p-5 rounded-xl">
          <div
            className={`p-4 rounded-xl  ${
              (idx === 0 && "bg-[#F0E6FF]  text-[#6600FF] ") ||
              (idx === 1 && "bg-[#FFB0B0] text-[#FF0000] ") ||
              (idx === 2 && "bg-[#B0FFC0] text-[#00BF26] ")
            }`}
          >
            <h2 className="text-md font-[400] flex items-center gap-2">
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
