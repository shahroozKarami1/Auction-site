"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../services/hooks/useLogin";
import { loginSchema } from "../services/hooks/validationSchemas";

type LoginFormData = {
  phone: string;
  password: string;
};

const LoginPage = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { mutate: login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null);

    login(data, {
      onError: (error: any) => {
        setLoginError(error.message || "Login failed. Please try again.");
      },
      onSuccess: () => {
        window.location.href = "/";
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {loginError && (
          <div className="p-3 text-red-600 bg-red-200 rounded">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              {...register("phone")}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
