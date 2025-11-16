import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData, Tags, PlanResponse } from "../types";
import { submitPlanRequest } from "../services/planApi";

export const usePlanSubmit = (formData: FormData, tags: Tags) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<PlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await submitPlanRequest({
        budget: formData.budget.toString(),
        time: `${formData.time} hours`,
        style: tags.aesthetic,
        location: tags.location,
        dietary: tags.allergies,
        inspiration: tags.inspiration,
      });

      console.log("result", result);

      const queryParams = new URLSearchParams({
        categories: JSON.stringify(result.restaurants || []),
        activities: JSON.stringify(result.activities || []),
      });

      router.push(`/choices?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    responseData,
    error,
    handleSubmit,
  };
};
