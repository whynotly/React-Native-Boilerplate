import type { Tokens } from './TokenTypes';

export type Role = 'admin' | 'user' | 'parking_attendant' | 'support';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_phone_verified: number;
  role: string;
  favorite_car_id: number | null;
  last_used_car_id: number | null;
  expo_push_token: string | null;
  customer_id: number | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export type ResponseBody = {
  user: User;
  tokens: Tokens;
};
