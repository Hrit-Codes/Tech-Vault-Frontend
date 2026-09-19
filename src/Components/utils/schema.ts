import { z } from "zod";

const fullNameField = z
  .string()
  .trim()
  .min(2, "Full name must be at least 2 characters")
  .max(60, "Full name is too long");

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address");

const phoneNumberField = z
  .string()
  .trim()
  .regex(
    /^(?:\+977[- ]?)?9[6-8]\d{8}$/,
    "Enter a valid Nepali phone number (e.g. 98XXXXXXXX)"
  );

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/\d/, "Password must contain a number");

export const registerSchema = z
  .object({
    fullName: fullNameField,
    email: emailField,
    phoneNumber: phoneNumberField,
    password: passwordField,
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((v) => v === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;