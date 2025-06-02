import { FileText } from "lucide-react";

export const ResourcesPanel = ({ task = [] }) => {
  const allFiles = task
    .flatMap((t) => t?.resourceFiles || [])
    .filter((f) => f?.fileName);

  return (
    <div className="border rounded-xl p-4 bg-white">
      <h3 className="text-sm font-semibold mb-2 text-[#1A1A1A]">Resources</h3>
      {allFiles.length > 0 ? (
        <ul className="text-sm text-muted-foreground space-y-2">
          {allFiles.map((file, index) => (
            <li key={index} className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#004368]" />
              <span>{file.fileName}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-muted-foreground">No resources available.</p>
      )}
    </div>
  );
};
