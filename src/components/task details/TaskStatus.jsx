import { ArrowRight } from "lucide-react";

const TaskStatus = () => {
  return (
    <div className="flex justify-between items-center ">
      <h3 className="font-semibold mb-2 text-[#004368] ">Status</h3>
      <div className="px-4 py-1 text-sm flex gap-6 border border-[#B0C5D0] rounded-[1vh] text-[#004368]">
        <p>In Progress</p>
        <ArrowRight />
      </div>
    </div>
  );
};

export default TaskStatus;
