import { email, string, z } from "zod";

export const signupValidation = z
  .object({
    name: z
      .string()
      .min(6, { message: "Name Must be atleast 6 character" })
      .max(20, { message: "UserName To long " }),
    email: z.string().email({ message: "Enter Valid Email" }),
    password: z.string().min(6, {
      message: "Password must be atleast 6 character",
    }),
    ConfirmPassword: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: "Password Not matched",
    path: ["ConfirmPassword"],
  });
