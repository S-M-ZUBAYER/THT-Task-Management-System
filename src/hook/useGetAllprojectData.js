import { axiosApi } from "@/lib/axiosApi";
import { useProjectStore } from "@/Zustand/useProjectStore";
import { useEffect, useState } from "react";

export const useGetAllProjectData = () => {
  const { project, setProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);

  const getAllProject = async () => {
    setIsLoading(true);
    try {
      const res = await axiosApi.get("/projects/getAll");
      setProject(res.data?.data || []);
    } catch (error) {
      console.error("All project error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!project || project.length === 0) {
      getAllProject();
    }
  }, []);

  return { project, refetch: getAllProject, isLoading };
};
