import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectTaskMenu from "./ProjectTaskMenu";

const ProjectTaskCard = ({ tasks, project_name, id }) => {
  const navigate = useNavigate();
  const handleBugClick = () => {
    navigate(`/tasks/${project_name}`);
  };
  return (
    <div
      className="border-2 border-[#E8D9FF] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-auto"
      onClick={handleBugClick}
    >
      <div>
        <div className=" flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-[#E8D9FF] rounded-full"></div>
            <p className="text-sm text-[#6600FF] font-medium">PROJECTS </p>
          </div>
          <div>
            <ProjectTaskMenu id={id} />
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-1 mt-6 break-words whitespace-pre-line max-w-full">
          {project_name}{" "}
        </h2>
        {tasks.length > 0 ? (
          <ul className="text-sm text-gray-700 list-decimal list-inside mb-4 line-clamp-4">
            {tasks.map(({ task_title }, index) => (
              <li key={index}>{task_title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No Data reported yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectTaskCard;
