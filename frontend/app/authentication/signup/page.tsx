"use client";

import { useState } from "react";
import LoadingComponent from "@/app/loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSignup from "../services/hooks/useSignup";

const SignupComponent = () => {
  const [rulesAccepted, setRulesAccepted] = useState(false); // State for rules acceptance
  const [serverError, setServerError] = useState(""); // State for server error message

  const signupSchema = z
    .object({
      phone: z.string().min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد"),
      email: z.string().email("لطفاً یک آدرس ایمیل معتبر وارد کنید"),
      first_name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
      last_name: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
      password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
      confirmPassword: z.string().min(8, "تایید رمز عبور الزامی است"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "رمز عبور با تکرار آن مطابقت ندارد",
      path: ["confirmPassword"],
    });

  type SignupFormData = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useSignup();

  const onSubmit = async (data: SignupFormData) => {
    setServerError(""); // Reset server error state on new submission
    try {
      await signupMutation.mutateAsync(data);
    } catch (error) {
      if (error.response?.data) {
        setServerError(error.response.data.phone?.[0] || "خطا در ثبت نام"); // Capture specific error message
      } else {
        setServerError("خطا در ثبت نام");
      }
    }
  };

  return (
    <div className="h-dvh flex flex-col lg:flex-row justify-center w-full text-right bg-primary">
      <div className="bg-[url('/img/auction.jpg')] lg:w-1/2 w-full flex flex-col justify-start bg-white shadow-lg bg-cover"></div>

      <div
        className="lg:w-1/2 w-full flex flex-col justify-start p-24 bg-white shadow-lg"
        dir="rtl"
      >
        <h1 className="text-4xl font-semibold mb-4 text-center">ثبت نام</h1>
        {serverError && (
          <p className="text-red-500 text-sm mb-4">{serverError}</p>
        )}{" "}
        {/* Display server error */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">
              شماره تلفن
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">ایمیل</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* First and Last Name in one row */}
          <div className="mb-4 flex flex-row-reverse space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm mb-2">
                نام خانوادگی
              </label>
              <input
                type="text"
                {...register("last_name")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600 text-sm mb-2">نام</label>
              <input
                type="text"
                {...register("first_name")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.first_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">رمز عبور</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">
              تکرار رمز عبور
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rulesAccepted"
              className="mr-2"
              checked={rulesAccepted}
              onChange={() => setRulesAccepted(!rulesAccepted)}
            />
            <label htmlFor="rulesAccepted" className="text-gray-600 text-sm">
              <a
                href="/public_pages/rules"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                قوانین و مقررات پرایموس
              </a>{" "}
              را می‌پذیرم
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-black text-white p-2 hover:bg-black/70 transition w-full rounded-md ${
              !rulesAccepted ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!rulesAccepted} // Disable until checkbox is checked
          >
            {signupMutation.isLoading ? <LoadingComponent /> : "ثبت نام"}
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <p className="text-sm">
            قبلاً حساب کاربری دارید؟{" "}
            <a
              href="/authentication/login"
              className="text-blue-600 hover:underline"
            >
              وارد شوید
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
