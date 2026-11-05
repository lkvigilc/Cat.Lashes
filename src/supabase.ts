import { createClient } from '@supabase/supabase-js';
import { environment } from './environments/environment';

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseAnonKey
);

export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  service_type: string;
  price: number;
  appointment_date: string;
  appointment_time: string;
  status?: string;
  notes?: string | null;
}
