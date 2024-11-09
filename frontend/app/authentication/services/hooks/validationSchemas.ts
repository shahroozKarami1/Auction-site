import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11, "phone is required"),
  password: z.string().min(4, "Password must be at least 8 characters long"),
});

export const signupSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  // user_type: z.enum(["real", "legal"]),
});
