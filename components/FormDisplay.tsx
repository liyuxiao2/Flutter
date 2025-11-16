import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePlanData } from "@/types";
import { chunkArray } from "@/lib/arrayHelpers";
import { StyledBadge } from "./shared/StyledBadge";

type FormProps = {
  FormData: DatePlanData;
};

export function FormDisplay({ FormData }: FormProps) {
  // Safely parse activities and restaurants
  const activities = Array.isArray(FormData.activities) ? FormData.activities : [];
  const restaurants = Array.isArray(FormData.restaurants) ? FormData.restaurants : [];

  // Split activities into chunks of 5
  const activityChunks = chunkArray(activities, 5);

  // Combine restaurants into the timeline
  const timeline = [
    ...activityChunks.map((chunk, index) => ({
      id: index,
      title: `Activity ${index + 1}`,
      items: chunk.map((activity) => ({ ...activity, type: "activity" as const })),
    })),
    {
      id: activityChunks.length,
      title: "A Table for Two",
      items: restaurants.map((restaurant) => ({ ...restaurant, type: "restaurant" as const })),
    },
  ];

  return (
    <Card className="bg-[#f5f4f4]">
      <CardHeader>
        <CardTitle className="text-h1 font-[instrument sans] font-bold text-[#474747]">
          Where love leads the way
        </CardTitle>
        <CardDescription className="text-[#474747] font-alice text-h2">
          A personalized date plan tailored for just you and your love
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {timeline.map((category) => (
            <div key={category.id} className="space-y-6">
              <h2 className="text-h2 font-[alice] text-[#474747]">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg shadow-md bg-[#fbfbfb]"
                  >
                    <h3 className="text-p1 font-alice text-[#474747]">{item.name}</h3>
                    <p className="text-[#474747]">{item.description}</p>
                    {item.type === "activity" && item.time && (
                      <p className="text-p2 font-[instrument sans] text-[#474747] mt-2">
                        <StyledBadge variant="orange">{item.time}</StyledBadge>
                      </p>
                    )}
                    {item.type === "restaurant" && (
                      <div className="space-y-1">
                        <p className="text-p2 font-[instrument sans] text-[#474747]">
                          <StyledBadge variant="orange">{item.address}</StyledBadge>
                        </p>
                        {item.rating && (
                          <p className="text-p2 font-[instrument sans] text-[#474747]">
                            <StyledBadge variant="orange">{item.rating} <span>stars</span></StyledBadge>
                          </p>
                        )}
                        {item.GoogleReview && (
                          <p className="text-p2 font-[instrument sans] text-[#474747]">
                            <StyledBadge variant="blue">
                              <a
                                href={item.GoogleReview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white"
                              >
                                Reviews
                              </a>
                            </StyledBadge>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
