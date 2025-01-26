"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FormDisplay } from "../FormData/page";
import Link from "next/link";

interface Activity {
  name: string;
  description: string;
  time?: string;
  GoogleReview?: string;
}

interface Restaurant {
  name: string;
  address: string;
  cuisine: string;
  rating?: string;
  description?: string;
  GoogleReview?: string;
}

const ActivityTimeline: React.FC = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<{ activities: Activity[]; restaurants: Restaurant[] }>({
    activities: [],
    restaurants: [],
  });

  useEffect(() => {
    const categoriesData = searchParams.get("categories");
    const activitiesData = searchParams.get("activities");

    try {
      const parsedCategories = categoriesData ? JSON.parse(categoriesData) : [];
      const parsedActivities = activitiesData ? JSON.parse(activitiesData) : [];

      // Transform parsed data into FormData format
      const transformedData = {
        activities: parsedActivities.map((activity: any) => ({
          name: activity.name,
          description: activity.description,
          time: activity.time,
          GoogleReview: activity.GoogleReview,
        })),
        restaurants: parsedCategories.map((category: any) => ({
          name: category.name,
          address: category.address || "",
          cuisine: category.tag || "",
          rating: category.rating?.toString() || "",
          description: category.description || "",
          GoogleReview: category.GoogleReview || "",
        })),
      };

      setFormData(transformedData);
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  }, [searchParams]);

  return (
    <div className="absolute bg-[#fbfbfb] top-0 w-screen h-screen overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href = "/" passHref>
            <button className="p-1">
              <span>&larr;</span>
            </button>
          </Link>
          <h1 className="text-lg font-semibold">Search Results</h1>
        </div>
        <button className="p-1">
          <span>&#x1F50D;</span>
        </button>
      </header>

      {/* Pass Transformed Data to FormDisplay */}
      <div className="p-4">
        <FormDisplay FormData={formData} />
      </div>
    </div>
  );
};

export default ActivityTimeline;
