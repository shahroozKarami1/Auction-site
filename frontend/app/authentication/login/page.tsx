"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../services/hooks/useLogin";
import { loginSchema } from "../services/hooks/validationSchemas";
import { ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type LoginFormData = {
  phone: string;
  password: string;
};

const LoginPage = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { mutate: login, isLoading } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null); // Reset error before attempting login

    login(data, {
      onError: (error: any) => {
        const backendErrorMessage = error.response?.data?.message;
        setLoginError(backendErrorMessage || "اطلاعات وارد شده صحیح نمی باشد");
      },
      onSuccess: () => {
        window.location.href = "/";
      },
    });
  };

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row justify-center w-full text-right bg-primary">
      <div
        className="absolute flex flex-row-reverse right-8 top-8 items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <ArrowForward className="text-gray-600 text-lg " />
        <p className="text-gray-600 text-sm">بازگشت به خانه</p>
      </div>
      <div className="bg-[url('/img/auction.jpg')] lg:w-1/2 w-full flex flex-col justify-start bg-white shadow-lg bg-cover"></div>

      <div
        className="lg:w-1/2 w-full flex flex-col justify-start p-24 bg-white shadow-lg pt-44"
        dir="rtl"
      >
        <h1 className="text-4xl font-semibold mb-4 text-center">ورود</h1>

        {loginError && (
          <div className="p-3 text-red-600 bg-red-200 rounded mb-4">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">
              شماره تلفن یا ایمیل
            </label>
            <input
              type="text"
              {...register("phone")}
              className={`w-full p-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">رمز عبور</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password?.message}
              </p>
            )}
            <p className="text-sm mt-2 text-gray-600">
              رمز عبور خود را فراموش کرده‌اید؟
              <a
                href="/authentication/forgot_password"
                className="text-blue-600 hover:underline px-2"
              >
                بازیابی رمز عبور
              </a>
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white p-2 hover:bg-black/70 transition w-full rounded-md"
            >
              ورود
            </button>
          </div>
        </form>

        <div className="mt-4 flex justify-center">
          <p className="text-sm">
            حساب کاربری ندارید؟{" "}
            <a
              href="/authentication/signup"
              className="text-blue-600 hover:underline"
            >
              ثبت نام کنید
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
