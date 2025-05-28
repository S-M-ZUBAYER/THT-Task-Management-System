import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BugHeader from "@/components/bug/BugHeader";
import BugTable from "@/components/bug/BugTable";
import { useBugStore } from "@/Zustand";

export default function BugDetailsPage() {
  const { setBugs, setBugProjectName, setId } = useBugStore();
  const location = useLocation();
  const { id, bugProjectName, bugs } = location.state || {};

  useEffect(() => {
    setBugs(bugs || []);
    setBugProjectName(bugProjectName || "");
    setId(id || null);
  }, [bugs, bugProjectName, id, setBugs, setBugProjectName, setId]);

  return (
    <div className="p-6 md:p-10 min-h-screen w-[80vw]">
      <BugHeader />
      <BugTable />
    </div>
  );
}
