export interface Session {
  id: string;
  user_id: string;
  car_id: string;
  parking_zone_id: string;
  credit_card_id: string;
  start_time: Date;
  end_time: Date;
  duration: string;
  total_cost: string;
  created_at: string;
  updated_at: string | null;
  payment_id: string;
  city_name: string;
  car_name: string;
  car_registration: string;
  city_zone: string;
}

export interface SessionData {
  car_registration: string;
  zone_id: string;
}
