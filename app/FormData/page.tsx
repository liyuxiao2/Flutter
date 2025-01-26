import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FormProps = {
  FormData: {
    activities: { name: string; description: string; time?: string }[];
    restaurants: { name: string; address: string; cuisine: string; rating?: string; description?: string; time?: string }[];
  };
};

export function FormDisplay({ FormData }: FormProps) {
  // Combine activities and restaurants into a single timeline
  const timeline = [
    ...FormData.activities.map((activity) => ({ ...activity, type: "activity" })),
    ...FormData.restaurants.map((restaurant) => ({ ...restaurant, type: "restaurant" })),
  ];

  // Sort by time (ensure the `time` field exists and is comparable)
  const sortedTimeline = timeline.sort((a, b) => {
    if (!a.time || !b.time) return 0; // If no time is present, keep the original order
    return a.time.localeCompare(b.time); // Sort chronologically
  });

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Your Date Itinerary</CardTitle>
        <CardDescription>Here's your AI-generated date plan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Render the sorted timeline */}
          {sortedTimeline.map((item, index) => (
            <div
              key={index}
              className={`mb-4 p-4 border rounded ${
                item.type === "activity" ? "bg-gray-100" : "bg-green-100"
              }`}
            >
              <h3 className="font-bold">{item.name}</h3>
              {item.time && <p><strong>Time:</strong> {item.time}</p>}
              <p>{item.description}</p>
              {item.type === "restaurant" && (
                <>
                  <p><strong>Address:</strong> {item.address}</p>
                  <p><strong>Cuisine:</strong> {item.cuisine}</p>
                  {item.rating && <p><strong>Rating:</strong> {item.rating}</p>}
                  {item.GoogleReview && <a><strong>GoogleReview:</strong> {item.GoogleReview}</a>}
                </>
              )}

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
