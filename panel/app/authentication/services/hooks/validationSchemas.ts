import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11, "phone is required"),
  password: z.string().min(4, "Password must be at least 6 characters long"),
});
