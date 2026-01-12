import { fetchProject } from "@/api/projects";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProject,
    staleTime: 5000,
  });
}

export default useProjects;
