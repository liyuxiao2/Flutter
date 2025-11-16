"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FormDisplay } from "@/components/FormDisplay";
import { PageHeader } from "@/components/shared/PageHeader";
import { DatePlanData } from "@/types";
import { transformSearchParamsToDatePlan } from "@/lib/dataTransformers";

const ActivityTimeline: React.FC = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<DatePlanData>({
    activities: [],
    restaurants: [],
  });

  useEffect(() => {
    const categoriesData = searchParams.get("categories");
    const activitiesData = searchParams.get("activities");
    const transformedData = transformSearchParamsToDatePlan(categoriesData, activitiesData);
    setFormData(transformedData);
  }, [searchParams]);

  return (
    <div className="absolute bg-[#fbfbfb] top-0 w-screen h-screen overflow-y-auto">
      <PageHeader title="Search Results" backHref="/" showSearch />
      <div className="p-4">
        <FormDisplay FormData={formData} />
      </div>
    </div>
  );
};

export default ActivityTimeline;
