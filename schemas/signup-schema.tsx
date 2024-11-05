import { z } from "zod";

export const SignupSchema = z.object({
  fname: z
    .string()
    .min(4, { message: "Minimum length is 4 characters" })
    .max(12, { message: "Maximum length is 12 characters" }),
  lname: z
    .string()
    .min(4, { message: "Minimum length is 4 characters" })
    .max(12, { message: "Maximum length is 12 characters" }),
  email: z.string().email({ message: "Provide a valid email" }),
  phone: z
    .string()
    .min(11, { message: "Minimum 11 digits required" })
    .max(14, { message: "Provide a valid phone number" }),
  password: z
    .string()
    .min(4, { message: "Minimum 4 character password" })
    .max(32, { message: "password not more than 32 characters" }),
    password_confirmation: z.string()
});
