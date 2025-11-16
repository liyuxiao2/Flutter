// Shared type definitions across the application

export interface Activity {
  name: string;
  description: string;
  time?: string;
  GoogleReview?: string;
}

export interface Restaurant {
  name: string;
  address: string;
  cuisine: string;
  rating?: string;
  description?: string;
  GoogleReview?: string;
}

export interface FormData {
  budget: number;
  time: number;
  aesthetic: string;
  location: string;
  allergies: string;
  inspiration: string;
}

export interface Tags {
  aesthetic: string[];
  location: string[];
  allergies: string[];
  inspiration: string[];
}

export interface PlanResponse {
  activities?: Activity[];
  restaurants?: Restaurant[];
}

export interface PlanRequest {
  budget: string;
  time: string;
  style: string[];
  location: string[];
  dietary: string[];
  inspiration: string[];
}

export interface DatePlanData {
  activities: Activity[];
  restaurants: Restaurant[];
}
