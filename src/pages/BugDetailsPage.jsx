// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import BugHeader from "@/components/bug/BugHeader";
import BugTable from "@/components/bug/BugTable";
// import { useBugStore } from "@/Zustand";
// import { axiosApi } from "@/lib/axiosApi";

export default function BugDetailsPage() {
  // const [bugs,setBugs]=useState(null)
  // const {  setBugProjectName, setId } = useBugStore();
  // const location = useLocation();
  // const { id, bugProjectName} = location.state || {};
  //     setBugProjectName(bugProjectName || "");
  //   setId(id || null);
  // useEffect(() => {
  //     getBugsById()
  // }, [ id]);
  // const getBugsById =async()=>{
  //   const res = await axiosApi.get(`/projectBug/with-bugs/getById/${id}`)
  //   setBugs(res.data.data.result)
  // }

  return (
    <div className="p-6 md:p-10 min-h-screen w-[80vw]">
      <BugHeader />
      <BugTable />
    </div>
  );
}
