
import { z } from 'zod';

export const authSchema = z.object({
    name: z.string().min(1, "Name is required"),
    message: z.string().min(1, "Doctor is required"),
    email: z
    .string()
    .email({ message: "Email must be a valid email" })
    .min(1, { message: "Email is required" }),
});
