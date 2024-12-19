import { z } from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .regex(/^\+?[\d\s-]+$/, { message: "Please enter a valid phone number" }),
  serviceType: z.enum(["call", "visit", "service"], {
    required_error: "Please select a service type",
  }),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Please select a future date",
  }),
  time: z.string({
    required_error: "Please select an appointment time",
  }),
  message: z
    .string()
    .max(500, { message: "Message must not exceed 500 characters" })
    .optional(),
});
