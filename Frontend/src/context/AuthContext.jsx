import { createContext, useContext, useMemo } from "react";
import { useCurrentUser } from "@/hooks/useAuth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading, isError } = useCurrentUser();

  const value = useMemo(
    () => ({
      user: user ?? null,
      isLoading,
      isAuthenticate: !!user && !isError && !isLoading,
    }),
    [user, isLoading, isError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context not found");
  }
  return context;
};
