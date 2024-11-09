"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken, clearTokens, getAccessToken } from "./token";
import api from "./axios";

export const getUserDetails = async (token: string) => {
  const response = await api.get("/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

type User = {
  id: string;
  phone: string;
  email?: string | null; // Optional, can be null
  first_name?: string | null; // Optional, can be null
  last_name?: string | null; // Optional, can be null
  user_type: "real" | "legal"; // Enum for user type
  avatar?: string | null; // Optional, path to the avatar image
  national_id_image?: string | null; // Optional, path to national ID image
  country?: string | null; // Optional
  province?: string | null; // Optional
  city?: string | null; // Optional
  address?: string | null; // Optional
  postal_code?: string | null; // Optional
  age?: number | null; // Optional, positive integer for age
  gender?: "male" | "female" | "non_binary" | null; // Enum for gender
  status: "not_verified" | "verified" | "banned"; // Enum for user status
  score: number; // Default 0
  is_admin: boolean; // Boolean flag for admin role
  is_manager: boolean; // Boolean flag for manager role
  is_active: boolean; // Boolean flag for active status
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null; // Hold user data
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null); // State for user data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsAuthenticated(true);
      // Fetch user details if authenticated
      getUserDetails(token).then((userData) => {
        setUser(userData);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string) => {
    setAccessToken(token);
    setIsAuthenticated(true);
    // Fetch and set user data after login
    getUserDetails(token).then((userData) => {
      setUser(userData);
    });
    router.push("/");
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
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
