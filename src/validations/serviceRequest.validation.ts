import { object, string } from "yup";

export const ServiceRequestSchema = object({
  name: string().required("Enter your name"),
  email: string().required("Enter your email"),
  time: string().required("Kindly specify a preferred time"),
  service_type: string().required("Select a service"),
});
