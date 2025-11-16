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

export interface Activity {
  name: string;
  description: string;
  time?: string;
}

export interface Restaurant {
  name: string;
  description: string;
  cuisine: string;
  rating?: string;
  address?: string;
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
