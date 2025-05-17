import React from "react";
import { Plus } from "lucide-react";
import BugIcon from "@/assets/svg/bug-01.svg?react";
import BugIconTwo from "@/assets/svg/bug-02.svg?react";

const BugCard = ({ bugs, name, findDate, solveDate }) => {
  return (
    <div className="border-2 border-[#E8D9FF] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-auto">
      <div>
        <div className=" flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-[#E8D9FF] rounded-full"></div>
            <p className="text-sm text-[#6600FF] font-medium">BUGS</p>
          </div>
          <div className="bg-[#E6ECF0] rounded-full ">
            <Plus className="text-[#004368] " />
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-1 mt-6">Project name</h2>
        <ul className="text-sm text-gray-700 list-decimal list-inside mb-4 line-clamp-4">
          {bugs.map((bug, index) => (
            <li key={index}>{bug}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${name}`}
            alt={name}
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">{name}</p>
        </div>

        <div className="flex gap-2 text-[0.6vw]">
          <div className="flex items-center gap-1 border border-[#FFE6E6] text-red-600 px-2 py-1 rounded-full">
            <BugIcon className="w-3 h-3 text-red-600" />
            <span>Found at {findDate}</span>
          </div>

          <div className="flex items-center gap-1 border border-[#F0E6FF] text-[#D0B0FF] px-2 py-1 rounded-full">
            <BugIconTwo className="w-3 h-3 text-[#D0B0FF]" />
            <span>Solved at {solveDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugCard;
