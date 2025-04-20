export interface IServiceBooked {
  id: number;
  name: string;
}

export interface IAppointment {
  id: number;
  patient_first_name: string;
  patient_last_name: string;
  doctor_first_name: string | null;
  doctor_last_name: string | null;
  services: IServiceBooked[] | []; // Can be an array of services or empty array
  created_at: string;
  updated_at: string;
  date_time: string;
  status: "booked" | "confirmed" | "cancelled";
  cost: string | null;
  notes: string | null;
  appointment_address: string | null;
  is_follow_up: boolean;
  is_confirmed: boolean;
  patient: number;
  doctor: number | null;
}

export interface ICancelAppointmentPayload {
  id: number;
  date_time: string;
  status: string;
  cost: string | null;
  notes: string | null;
  appointment_address: string | null;
  is_follow_up: boolean;
  is_confirmed: boolean;
  patient: number;
  doctor: number | null;
}

export interface IAvailability {
  id: number;
  doctor?: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  max_patients_per_slot?: number;
  notes?: string;
}
