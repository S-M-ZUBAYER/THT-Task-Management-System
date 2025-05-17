import React from "react";
import BugCard from "@/components/BugCard";

const bugsList = [
  {
    bugs: [
      "Web Accessibility issues – Problems related to screen readers, keyboard navigation, and color contrast.",
      "Data Validation Bugs – Errors in form validations that lead to incorrect data entries.",
      "Performance Bottlenecks – Slow response times or lag in application functionality.",
    ],
    name: "Aisha Khan",
    findDate: "June 1, 2025",
    solveDate: "June 15, 2025",
  },
  {
    bugs: [
      "Mobile App Bugs – Issues specific to mobile applications such as compatibility, usability, and crashes.",
      "Integration Bugs – Problems arising from data exchange between systems or third-party services.",
    ],
    name: "Ravi Patel",
    findDate: "June 20, 2025",
    solveDate: "July 5, 2025",
  },
  {
    bugs: [
      "Software Bug List – Common bugs in apps or websites (e.g., UI glitches, crashes, security flaws).",
      "Programming Bug list – Frequent coding mistakes in languages like Python, JavaScript, etc.",
      "Bug/Issue List – A list of real-world insects (e.g., beetles, ants, mosquitoes).",
      "Game Bug List – Known bugs/glitches in a specific game.",
      "Device Bug List – Issues in a particular phone, laptop, or operating system.",
    ],
    name: "Dolon Mondal",
    findDate: "May 16, 2025",
    solveDate: "May 30, 2025",
  },
  {
    bugs: [
      "User Interaction Bugs – Issues affecting how users interact with interfaces, such as unresponsive buttons or incorrect feedback messages.",
      "Localization Bugs – Errors in translations or cultural misrepresentations in software for different regions.",
    ],
    name: "Maria Smith",
    findDate: "July 10, 2025",
    solveDate: "July 20, 2025",
  },
  {
    bugs: [
      "E-commerce Bugs – Problems related to online shopping experiences, such as payment errors or inventory discrepancies.",
    ],
    name: "John Doe",
    findDate: "August 1, 2025",
    solveDate: "August 18, 2025",
  },
  {
    bugs: [
      "Software Bug List – Common bugs in apps or websites (e.g., UI glitches, crashes, security flaws).",
      "Programming Bug list – Frequent coding mistakes in languages like Python, JavaScript, etc.",
      "Bug/Issue List – A list of real-world insects (e.g., beetles, ants, mosquitoes).",
      "Game Bug List – Known bugs/glitches in a specific game.",
      "Device Bug List – Issues in a particular phone, laptop, or operating system.",
    ],
    name: "Dolon Mondal",
    findDate: "May 16, 2025",
    solveDate: "May 30, 2025",
  },
  {
    bugs: [
      "Authentication Bugs – Issues related to user login/logout processes, such as session expirations or incorrect credential handling.",
      "API Bugs – Problems with application programming interfaces, including response errors or integration failures.",
    ],
    name: "Emily Johnson",
    findDate: "September 6, 2025",
    solveDate: "September 20, 2025",
  },
];

const BugManagement = () => {
  return (
    <section className="w-full px-6 py-8">
      <p className="text-[28px] font-semibold leading-[150%] text-[#004368] font-poppins mb-6">
        Bug’s & Solutions
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bugsList.map((bugData, index) => (
          <BugCard key={index} {...bugData} />
        ))}
      </div>
    </section>
  );
};

export default BugManagement;
