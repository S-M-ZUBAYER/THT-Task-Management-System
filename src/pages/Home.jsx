import React from "react";
import icons from "@/constants/icons";
import { Clock } from "@/components/svg/svg";

const columns = [
  {
    title: "To Do",
    color: "bg-[#F0E6FF] ",
    headerColor: "bg-purple-200",
    emoji: icons.ToDo,
  },
  {
    title: "In Progress",
    color: "bg-red-100",
    headerColor: "bg-red-200",
    emoji: icons.TaskProgress,
  },
  {
    title: "Completed",
    color: "bg-green-100",
    headerColor: "bg-green-200",
    emoji: icons.TaskDone,
  },
];

const Card = () => (
  <div className="bg-white rounded-xl border-[#E8D9FF] border p-4  space-y-3 ">
    <div className="text-xs text-purple-600 font-bold flex justify-between">
      <p>Project</p>
      <img src={icons.ThreeDots} alt="three dots" className="w-5 rotate-90" />
    </div>
    <h3 className="font-semibold">Task name</h3>
    <p className="text-sm text-gray-500">
      Create a high-fidelity UI for the landing page following brand guidelines.
      Include a hero section, features block, testimonials, and CTA buttons.
      Collaborate with the content and marketing teams for copy and assets.
    </p>
    <div className="text-sm text-red-500 font-medium flex  items-center gap-1">
      <Clock Stock="#6600FF" />
      <p>Deadline: May 12, 2025</p>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mx-10 ">
      {columns.map((col, idx) => (
        <div key={idx} className="space-y-4 shadow-sm p-5 rounded-xl">
          <div
            className={`p-4 rounded-xl  ${
              (idx === 0 && "bg-[#F0E6FF]  text-[#6600FF] ") ||
              (idx === 1 &&
                "bg-[#FFE6E6] text-[#FF0000] border border-[#FFB0B0] ") ||
              (idx === 2 &&
                "bg-[#E6FFEB] text-[#00BF26] border border-[#B0FFC0] ")
            }`}
          >
            <div className="text-md font-[400] flex items-center gap-2">
              <img
                src={col.emoji}
                alt="icon"
                className="w-5 h-5"
                style={{
                  filter:
                    idx === 0
                      ? "invert(16%) sepia(88%) saturate(6361%) hue-rotate(258deg) brightness(100%) contrast(101%)"
                      : idx === 1
                      ? "invert(18%) sepia(95%) saturate(5661%) hue-rotate(1deg) brightness(103%) contrast(102%)"
                      : "invert(43%) sepia(86%) saturate(2832%) hue-rotate(95deg) brightness(97%) contrast(102%)",
                }}
              />

              <p>{col.title} </p>
            </div>
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
