import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const registerFormSchema = z.object({
  name: z.string().min(4).max(255),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
