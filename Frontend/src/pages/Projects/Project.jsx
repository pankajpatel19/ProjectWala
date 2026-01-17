import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Project() {
  const { data, isLoading, isError } = useProjects();

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-red-500 text-lg">
          Failed to load projects. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <ToastContainer />
      <div className="mb-8">
        <Button>Logout</Button>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Projects</h2>
        <p className="text-gray-600">
          Browse through our collection of premium templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((project) => (
          <Card
            key={project._id}
            className="hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 line-clamp-1">
                {project.name}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              />

              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech, index) => (
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
              <p className="text-2xl font-bold text-blue-600">
                ${project.price}
              </p>
              <Link
                to={`/projects/${project._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                View Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Project;
