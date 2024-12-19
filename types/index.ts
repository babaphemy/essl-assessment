export type ServiceType = 'call' | 'visit' | 'consultation';

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface SchedulingFormData {
  serviceType: ServiceType;
  date: Date;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}