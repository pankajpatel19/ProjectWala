import useProjects from "@/hooks/useProjects";
import React from "react";

function Project() {
  const { data, isLoading, isError } = useProjects();
  console.log(data);

  return <div></div>;
}

export default Project;
