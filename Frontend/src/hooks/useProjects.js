import { fetchProject, individualProject } from "@/api/projects";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProject,
    staleTime: 5000,
  });
}

export function useIndividualProject(id) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => individualProject(id),
    staleTime: 5000,
  });
}
