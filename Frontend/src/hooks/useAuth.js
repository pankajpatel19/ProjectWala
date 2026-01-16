import { current, login, signup } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignUpMutate() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);

      return navigate("/login", { replace: true });
    },
    onError: (err) => console.log(err),
  });
}

export function useLoginMutate() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      return navigate("/projects", { replace: true });
    },
    onError: (err) => console.log(err),
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: current,
    staleTime: 5000,
  });
}
