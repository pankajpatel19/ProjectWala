import { current, login, logout, signup } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignUpMutate() {
  const queryCLient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (!data?.success) {
        return;
      }
      navigate("/projects", { replace: true });
    },
    onError: (err) => console.log(err),
  });
}

export function useLoginMutate() {
  const navigate = useNavigate();
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data?.success) {
        return;
      }
      queryCLient.invalidateQueries(["currentUser"]);
      navigate("/projects", { replace: true });
    },
    onError: (err) => {
      queryCLient.removeQueries(["currentUser"]);
      return err;
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: current,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useLogOut() {
  const queryCLient = useQueryClient();

  return async () => {
    await logout();
    queryCLient.clear();
  };
}
