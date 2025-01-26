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
      title: `Activity ${index + 1}`,
      items: chunk.map((activity) => ({ ...activity, type: "activity" })),
    })),
    {
      id: activityChunks.length,
      title: "A Table for Two",
      items: restaurants.map((restaurant) => ({ ...restaurant, type: "restaurant" })),
    },
  ];

  return (
    <Card className="bg-[#f5f4f4]">
      <CardHeader>
        <CardTitle className="text-h1 font-[instrument sans] font-bold text-[#474747]">Where love leads the way</CardTitle>
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
                    className={`p-4 rounded-lg shadow-md ${
                      item.type === "activity" ? "bg-[#fbfbfb]" : "bg-[#fbfbfb]"
                    }`}
                  >
                    <h3 className="text-p1 font-alice text-[#474747]">{item.name}</h3>
                    <p className="text-[#474747]">{item.description}</p>
                    {item.time && (
                      <p className="text-p2 font-[instrument sans] text-[#474747] mt-2">
                        <span className="text-white px-2 py-0.5 rounded-full bg-[#fc7a4b] text-sm"> {item.time} </span>
                      </p>
                    )}
                    {item.type === "restaurant" && (
                      <div className="space-y-1">
                        <p className="text-p2 font-[instrument sans] text-[#474747]">
                          
                          <span className="text-white px-2 py-0.5 rounded-full bg-[#fc7a4b] text-sm">{item.address}</span>
                        </p>
                        
                        {item.rating && (
                          <p className="text-p2 font-[instrument sans] text-[#474747]">
                            <span className="text-white px-2 py-0.5 rounded-full bg-[#fc7a4b] text-sm">{item.rating} <span>stars</span> </span>
                          </p>
                        )}
                        {item.GoogleReview && (
                          <p className="text-p2 font-[instrument sans] text-[#474747]">
                            <span className="text-white px-2 py-0.5 rounded-full bg-[#97aeef] text-sm">
                            <a
                              href={item.GoogleReview}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white"
                            >
                              {"Reviews"}
                            </a> </span>
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
