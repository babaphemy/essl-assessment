import { AppointmentRequest } from "@/types";

export const validateAppointment = (data: AppointmentRequest): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!data.phone || !/^\+?[\d\s-]{10,}$/.test(data.phone)) {
    errors.push("Please enter a valid phone number");
  }

  if (!data.date || new Date(data.date) < new Date()) {
    errors.push("Please select a future date");
  }

  return errors;
};
