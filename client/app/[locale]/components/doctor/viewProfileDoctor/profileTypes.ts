export interface IDoctorDetails {
  id: number;
  email: string;
  specialization: string;
  another_qualification1: string | null;
  another_qualification2: string | null;
  years_of_experience: number;
  clinic_name: string;
  availability_for_sessions: boolean;
}

export interface IDoctor {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  nationality: string;
  current_residence: string;
  fluent_languages: string;
  doctor_details: IDoctorDetails;
  role: string;
  image: string | null;
  rating?: number;
}
