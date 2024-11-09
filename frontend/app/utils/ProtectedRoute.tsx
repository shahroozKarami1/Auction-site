"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log(isAuthenticated, "push to login ");
      router.push("/authentication/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
