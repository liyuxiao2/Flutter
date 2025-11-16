import { PlanRequest, PlanResponse } from "../types";

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? ''
  : "http://127.0.0.1:8000";

export class PlanApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "PlanApiError";
  }
}

export const submitPlanRequest = async (request: PlanRequest): Promise<PlanResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new PlanApiError(
        errorData.error || `HTTP error! Status: ${response.status}`,
        response.status
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof PlanApiError) {
      throw error;
    }
    throw new PlanApiError(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
