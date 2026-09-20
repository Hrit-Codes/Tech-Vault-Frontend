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

// ── Used for both Register and Change Password ──
const basePasswordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/\d/, "Password must contain a number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>_+=;'-]/, 
    "Password must contain at least one special character (!@#$%^&*...)"
  );

export const registerSchema = z
  .object({
    fullName: fullNameField,
    email: emailField,
    phoneNumber: phoneNumberField,
    password: basePasswordField,
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

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: basePasswordField,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password cannot be the same as your current password",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required") 
    .email("Please enter a valid email address"), 
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  otp: z
    .string()
    .trim()
    .min(1, "OTP is required"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters") // Matches MinLength(6)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>[\]\\/~`_+=;'-]/,
      "Password must contain at least one special character"
    ),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;