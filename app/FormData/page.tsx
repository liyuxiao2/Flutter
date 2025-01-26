import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FormProps = {
  FormData: {
    activities: { name: string; description: string; time?: string; GoogleReview?: string }[];
    restaurants: { name: string; address: string; cuisine: string; rating?: string; description?: string; GoogleReview?: string }[];
  };
};

export function FormDisplay({ FormData }: FormProps) {
  // Function to split the activities into chunks of 5
  const chunkArray = (array: any[], chunkSize: number) => {
    if (!Array.isArray(array)) return []; // Ensure the input is an array
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Safely parse activities and restaurants
  const activities = Array.isArray(FormData.activities) ? FormData.activities : [];
  const restaurants = Array.isArray(FormData.restaurants) ? FormData.restaurants : [];

  // Split activities into chunks of 5
  const activityChunks = chunkArray(activities, 5);

  // Combine restaurants into the timeline
  const timeline = [
    ...activityChunks.map((chunk, index) => ({
      id: index,
      title: `Category ${index + 1}`,
      items: chunk.map((activity) => ({ ...activity, type: "activity" })),
    })),
    {
      id: activityChunks.length,
      title: "Restaurants",
      items: restaurants.map((restaurant) => ({ ...restaurant, type: "restaurant" })),
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Your Date Itinerary</CardTitle>
        <CardDescription className="text-gray-600">
          Here's your AI-generated date plan, perfectly tailored for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {timeline.map((category) => (
            <div key={category.id} className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg shadow-sm ${
                      item.type === "activity" ? "bg-blue-50" : "bg-green-50"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    {item.time && (
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Time:</strong> {item.time}
                      </p>
                    )}
                    {item.type === "restaurant" && (
                      <div className="mt-4 space-y-1">
                        <p className="text-sm text-gray-500">
                          <strong>Address:</strong> {item.address}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Cuisine:</strong> {item.cuisine}
                        </p>
                        {item.rating && (
                          <p className="text-sm text-gray-500">
                            <strong>Rating:</strong> {item.rating}
                          </p>
                        )}
                        {item.GoogleReview && (
                          <p className="text-sm text-gray-500">
                            <strong>Google Review:</strong>{" "}
                            <a
                              href={item.GoogleReview}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {item.GoogleReview}
                            </a>
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
