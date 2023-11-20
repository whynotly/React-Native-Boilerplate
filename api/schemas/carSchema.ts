import { z } from 'zod';

export const createCar = z.object({
  name: z.string(),
  registration: z.string(),
});

export type CreateCar = z.infer<typeof createCar>;

export const updateCar = z.object({
  name: z.string(),
});

export type UpdateCar = z.infer<typeof updateCar>;
