/** @format */

import { z } from "zod";

export const authSchema = z
  .object({
    name: z
      .string()
      .min(1, "auth:errorRequired")
      .optional(),
    email: z.string().email("auth:errorEmail"),
    password: z.string().min(6, "auth:errorPassword"),
    confirmPassword: z
      .string()
      .min(6, "auth:errorPassword"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "auth:errorMismatch",
      path: ["confirmPassword"],
    },
  );

export type AuthFormValues = z.infer<typeof authSchema>;
