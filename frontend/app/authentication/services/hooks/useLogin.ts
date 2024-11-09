"use client";

import { setAccessToken, setRefreshToken } from "@/app/utils/token";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { loginSchema } from "./validationSchemas";
import { z } from "zod";

interface LoginCredentials {
  phone: string;
  password: string;
}

interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  message: string;
}

const useLogin = () => {
  const mutation = useMutation<LoginResponse, AxiosError, LoginCredentials>(
    async (credentials: LoginCredentials): Promise<LoginResponse> => {
      try {
        loginSchema.parse(credentials);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors.map((e) => e.message).join(", "));
        }
      }

      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/api/login/",
        credentials
      );

      return response.data;
    },
    {
      onSuccess: (data) => {
        setAccessToken(data.tokens.access);
        setRefreshToken(data.tokens.refresh);
      },
      onError: (error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error("Backend error message:", error.response.data.message);
        } else {
          console.error("An unexpected error occurred:", error.message);
        }
      },
    }
  );

  return mutation;
};

export default useLogin;
