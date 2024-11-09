"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken, clearTokens, getAccessToken } from "./token";
import api from "./axios";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      api
        .post("http://localhost:8000/api/token/verify/", { token })
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string) => {
    setAccessToken(token);
    setIsAuthenticated(true);
    router.push("/");
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
