import { z } from 'zod';

export const register = z.object({
  email: z.string().email(),
  name: z.string().min(3, 'Внесете го целото ваше име и презиме не само името'),
  password: z.string(),
  role: z.literal('user'),
});

export type Register = z.infer<typeof register>;

export const login = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type Login = z.infer<typeof login>;

export const refreshTokens = z.object({
  refresh_token: z.string(),
});

export type RefreshToken = z.infer<typeof refreshTokens>;

export const verifyForgotPasswordPhone = z.object({
  phoneNumber: z.string(),
});

export type VerifyPhone = z.infer<typeof verifyForgotPasswordPhone>;

export const forgotPassword = z.object({
  phone: z
    .string()
    .regex(/^[0-9]+$/, 'Телефонскиот број мора да содржи само броеви'),
  otp: z.string().length(6, 'OTP мора да има точно 6 карактери'),
});

export type ForgotPassword = z.infer<typeof forgotPassword>;

export const resetPassword = z.object({
  token: z.string(),
  password: z.string(),
});

export type ResetPassword = z.infer<typeof resetPassword>;

export const changePassword = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export type ChangePassword = z.infer<typeof changePassword>;
