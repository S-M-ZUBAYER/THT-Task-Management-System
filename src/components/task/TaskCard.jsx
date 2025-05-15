import { CalendarDays, Users } from "lucide-react";

export const TaskCard = () => {
  return (
    <div className="border border-[#ded8fc] rounded-xl p-[2vw] w-full max-w-[440px] h-[25vh]  bg-white hover:shadow-md transition-all">
      <span className="text-[10px] text-[#925FE2] font-semibold uppercase mb-2 block">
        ● Project
      </span>
      <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1">Task name</h3>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        Create a high-fidelity UI for the landing page following brand
        guidelines. Include a hero section, features block, testimonials, and
        CTA buttons.
      </p>
      <div className="text-xs text-red-500 flex items-center gap-1 mb-2">
        <CalendarDays size={14} className="text-red-500" />
        <span>Deadline: May 12, 2025</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/150?img=${i + 5}`}
            className="w-6 h-6 rounded-full border-2 border-white -ml-1"
          />
        ))}
      </div>
    </div>
  );
};
