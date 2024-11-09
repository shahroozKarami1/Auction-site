"use client";

import { setAccessToken, setRefreshToken } from "@/app/utils/token";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  const mutation = useMutation(
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

      console.log(response);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAccessToken(data.tokens.access);
        setRefreshToken(data.tokens.refresh);
      },
    }
  );

  return mutation;
};

export default useLogin;
