import { z } from 'zod';

export interface City {
  id: string;
  name: string;
  lat: number;
  long: number;
  parking_start_time: string;
  parking_end_time: string;
  disabled_parking: boolean;
  disabled_parking_description: string;
  free_parking: boolean;
  free_parking_description: string;
  updated_at: string;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Zone {
  id: string;
  name: string;
  city_id: string;
  coordinates: Coordinate[];
  rate_local: number;
  rate_foreign: string;
  zone_type: string;
  parking_admin_id: string;
}

export const getCityByName = z.object({
  cityName: z.string(),
});

export type CityName = z.infer<typeof getCityByName>;

export const getCityById = z.object({
  cityId: z.number(),
});

export type CityId = z.infer<typeof getCityById>;
