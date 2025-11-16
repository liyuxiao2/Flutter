import { Activity, Restaurant, DatePlanData } from "@/types";

/**
 * Transforms URL search params data into DatePlanData format
 */
export function transformSearchParamsToDatePlan(
  categoriesData: string | null,
  activitiesData: string | null
): DatePlanData {
  try {
    const parsedCategories = categoriesData ? JSON.parse(categoriesData) : [];
    const parsedActivities = activitiesData ? JSON.parse(activitiesData) : [];

    return {
      activities: parsedActivities.map((activity: any): Activity => ({
        name: activity.name,
        description: activity.description,
        time: activity.time,
        GoogleReview: activity.GoogleReview,
      })),
      restaurants: parsedCategories.map((category: any): Restaurant => ({
        name: category.name,
        address: category.address || "",
        cuisine: category.tag || "",
        rating: category.rating?.toString() || "",
        description: category.description || "",
        GoogleReview: category.GoogleReview || "",
      })),
    };
  } catch (error) {
    console.error("Error parsing data:", error);
    return { activities: [], restaurants: [] };
  }
}
