import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIndividualProject } from "@/hooks/useProjects";
import React from "react";
import { useParams } from "react-router-dom";

function IndividualProject() {
  const { id } = useParams();
  const { data } = useIndividualProject(id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 line-clamp-1">
            {data?.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {data?.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <img
            src={data?.thumbnail}
            alt={data?.name}
            className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
          />

          <div className="flex flex-wrap gap-2">
            {data?.technology.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t pt-4">
          <p className="text-2xl font-bold text-blue-600">${data?.price}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default IndividualProject;
