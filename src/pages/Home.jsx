import React from "react";
import icons from "@/constants/icons";
import { Clock } from "@/components/svg/svg";

const columns = [
  {
    title: "To Do",
    cards: [
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        deadline: "Not started yet",
      },
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        deadline: "Not started yet",
      },
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        deadline: "Not started yet",
      },
    ],
  },
  {
    title: "In Progress",
    cards: [
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        deadline: "May 12, 2025",
      },
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        deadline: "May 12, 2025",
      },
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        deadline: "May 12, 2025",
      },
    ],
  },
  {
    title: "Completed",
    cards: [
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        Completed: "May 12, 2025",
      },
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        Completed: "May 12, 2025",
      },
      {
        title: "Task name",
        description:
          "Create a high-fidelity UI for the landing page following brand guidelines. Include a hero section, features block, testimonials, and CTA buttons. Collaborate with the content and marketing teams for copy and assets.",
        Completed: "May 12, 2025",
      },
    ],
  },
];

const statusColors = [
  {
    border: "border-[#E8D9FF]",
    text: "text-[#6600FF]",
    bg: "bg-[#F0E6FF]",
    svgColor: "#6600FF",
  },
  {
    border: "border-[#FFB0B0]",
    text: "text-[#FF0000]",
    bg: "bg-[#FFE6E6]",
    svgColor: "#FF0000",
  },
  {
    border: "border-[#B0FFC0]",
    text: "text-[#00BF26]",
    bg: "bg-[#E6FFEB]",
    svgColor: "#00BF26",
  },
];

const Card = ({ title, description, dateLabel, date, statusIndex }) => {
  const { svgColor, text } = statusColors[statusIndex];

  return (
    <div
      className={`bg-white rounded-xl border-2 p-4 space-y-3 border-[#E8D9FF]`}
    >
      <div className="text-xs text-purple-600 font-bold flex justify-between">
        <p>Project</p>
        <img src={icons.ThreeDots} alt="three dots" className="w-5 rotate-90" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div className={`text-sm font-medium flex items-center gap-1 ${text}`}>
        <Clock Stock={svgColor} />
        <p>
          {dateLabel}: {date}
        </p>
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
};

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-10">
      {columns.map((col, idx) => {
        const { bg, text, border } = statusColors[idx];
        return (
          <div key={idx} className="space-y-4 shadow-sm p-5 rounded-xl">
            <div className={`p-4 rounded-xl ${bg} ${text} ${border}`}>
              <div className="text-md font-[400] flex items-center gap-2">
                <img
                  src={
                    icons[
                      idx === 0
                        ? "ToDo"
                        : idx === 1
                        ? "TaskProgress"
                        : "TaskDone"
                    ]
                  }
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
                <p>{col.title}</p>
              </div>
            </div>

            {col.cards.map((card, i) => (
              <Card
                key={i}
                title={card.title}
                description={card.description}
                dateLabel={col.title === "Completed" ? "Completed" : "Deadline"}
                date={card.deadline || card.Completed}
                statusIndex={idx}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
