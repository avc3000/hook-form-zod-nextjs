import { z } from "zod";

const plans = ["free", "basic", "medium", "pro"] as const;

export type Plans = (typeof plans)[number];

export const mappedPlans: { [key in Plans]: string } = {
  free: "Free",
  basic: "Basic",
  medium: "Medium",
  pro: "Pro",
};

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(200, { message: "Maximum 200 characters." }),
    email: z.string().email({ message: "Email address valid please." }),
    password: z.string().min(6, { message: "Minimum 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 characters." }),
    birthday: z
      .string()
      .refine((birth) => new Date(birth).toString() !== "Invalid Date", {
        message: "Date invalid.",
      }),
    weight: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
      message: "Weight must be a number.",
    }),
    plan: z.enum(plans, {
      errorMap: () => ({ message: "Select a plan." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match.",
    path: ["confirmPassword"],
  });
