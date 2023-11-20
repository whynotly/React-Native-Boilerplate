import { z } from 'zod';

export const updateUser = z
  .object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    customer_id: z.string().optional(),
    expo_push_token: z.string().optional(),
  })
  .refine(
    ({ email, name, customer_id, expo_push_token }) =>
      email || name || customer_id || expo_push_token,
    {
      message: 'At least one field is required',
    },
  );

export type UpdateUser = z.infer<typeof updateUser>;
