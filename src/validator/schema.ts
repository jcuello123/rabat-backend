import { z } from 'zod';

const maxHelper = (field: string, length: number) => {
  return `${field} must be at most ${length} characters long`;
};

const minHelper = (field: string, length: number) => {
  return `${field} must be at least ${length} characters long`;
};

export const zUser = z.object({
  email: z
    .string()
    .email({ message: 'Email must be in the proper format' })
    .max(255, { message: maxHelper('Email', 255) }),
  username: z
    .string()
    .min(3, { message: minHelper('Username', 3) })
    .max(20, { message: maxHelper('Username', 20) }),
  password: z
    .string()
    .min(5, { message: minHelper('Password', 5) })
    .max(50, { message: maxHelper('Password', 50) }),
});
