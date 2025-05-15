import { FileText } from "lucide-react";

const items = [
  "Figma file of Grozziie app UI Design",
  "Resource of Desktop app",
  "Prototype of Mobile app",
  "Design system documentation",
  "User flow diagrams",
  "Style guide for branding",
  "Accessibility compliance checklist",
  "Component library overview",
  "Feedback and testing reports",
];

export const ResourcesPanel = () => {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h3 className="text-sm font-semibold mb-2 text-[#1A1A1A]">Resources</h3>
      <ul className="text-sm text-muted-foreground space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#004368]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
