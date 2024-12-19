export interface AppointmentRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: "call" | "visit" | "service";
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
