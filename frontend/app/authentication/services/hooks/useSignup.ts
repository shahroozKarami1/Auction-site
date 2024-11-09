"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setAccessToken, setRefreshToken } from "@/app/utils/token";
import { z } from "zod";

const useSignup = () => {
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
  interface SignupResponse {
    tokens: {
      access: string;
      refresh: string;
    };
    message: string;
  }

  const mutation = useMutation(
    async (data: SignupFormData): Promise<SignupResponse> => {
      console.log("Sending data to server:", data); // Debug log
      const response = await axios.post<SignupResponse>(
        "http://localhost:8000/api/signup/", // Ensure this is the correct URL
        data
      );
      console.log("Server response:", response.data); // Debug log
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAccessToken(data.tokens.access);
        setRefreshToken(data.tokens.refresh);
        window.location.href = "/";
      },
      onError: (error) => {
        console.error("Signup failed:", error);
      },
    }
  );

  return mutation;
};

export default useSignup;
