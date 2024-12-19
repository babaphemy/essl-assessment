import * as z from "zod";

export const schedulingFormSchema = z.object({
  serviceType: z.enum(["call", "visit", "consultation"], {
    required_error: "Please select a service type.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  notes: z.string().optional(),
});