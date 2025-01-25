import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from an API call or database
const mockItinerary = {
  activities: [
    { name: "Romantic Picnic", time: "12:00 PM", location: "Central Park" },
    { name: "Art Gallery Visit", time: "2:00 PM", location: "Metropolitan Museum of Art" },
    { name: "Dinner", time: "7:00 PM", location: "Le Bernardin" },
  ],
}

export default function Itinerary() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Your Date Itinerary</CardTitle>
        <CardDescription>Here's your AI-generated date plan</CardDescription>
      </CardHeader>
      <CardContent>
        {mockItinerary.activities.map((activity, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h3 className="font-bold">{activity.name}</h3>
            <p>Time: {activity.time}</p>
            <p>Location: {activity.location}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

