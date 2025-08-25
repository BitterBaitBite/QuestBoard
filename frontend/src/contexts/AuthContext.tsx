import { createContext, useContext } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("The hook useAuth must be used inside AuthProvider");
  }

  return authContext;
}
