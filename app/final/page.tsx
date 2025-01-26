import React from "react";
import { ArrowLeft, Filter, Plus } from "lucide-react";
import { cn } from "@/lib/utils";


const scrollbarHideClass = `
  [&::-webkit-scrollbar]:hidden
  [-ms-overflow-style:'none']
  [scrollbar-width:'none']
`;

interface Activity {
  id: number;
  name: string;
  address: string;
  tag: string;
  priceRange: string;
  image: string;
}

interface Category {
  id: number;
  time: string;
  activities: Activity[];
}

const activities: Activity[] = [
  { id: 1, name: "Danny's Activity", address: "390 King Street West", tag: "Greek", priceRange: "~$20", image: "https://example.com/image1.png" },
  ];

const categories: Category[] = [
  { id: 1, time: "12:00 pm", activities: activities.slice() },
  { id: 2, time: "1:30 pm", activities: activities.slice() },
  { id: 3, time: "2:00 pm", activities: activities.slice()},
  { id: 4, time: "3:00 pm", activities: activities.slice()},
];

const ActivityTimeline: React.FC = () => {
    return (
      <div className="absolute bg-[#fbfbfb] top-0 w-screen h-screen overflow-y-auto">
        {/* Header */}
        <h1 className="sticky top-0 z-10 bg-[#FC7A4B] shadow-sm text-white py-6 px-4 text-center">
        <h1 className="font-bold text-4xl font-[instrument sans] mb-2">
        Where love <span className="italic">leads</span> the way
        </h1>
        <h3 className="text-h3 font-alice">A perfectly curated date itinerary for you and your love</h3>
      </h1>
  
  
        {/* Categories Timeline */}
        <div className="flex items-center justify-center relative px-1 py-6">
          <div className="space-y-5">
            {categories.map((category) => (
              <div key={category.id} className="relative">
                
                {/* Category Details */}
                <div className="pl-12">
                  <p className="font-instrument text-p1 text-[#474747] mb-1">{category.time}</p>
  
                  {/* Activitys */}
                  <div className={cn("overflow-x-auto pb-4 -mx-4 px-4", scrollbarHideClass)}>
                    <div className="flex gap-4 min-w-min">
                      {category.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="bg-white rounded-3xl shadow-sm overflow-hidden flex-shrink-0"
                          style={{ width: "450px", height: "220px" }}
                        >
                          {/* Activity Image */}
                          <div className="aspect-[7/2] bg-[#97aeef]" />
  
                          {/* Activity Info */}
                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-alice text-p1 text-[#474747] mb-0.5">{activity.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                        
                                  <span className="text-white px-2 py-0.5 rounded-full bg-[#FC7A4B] text-sm">{activity.address}</span>
                                  <span className="text-white px-2 py-0.5 rounded-full bg-[#97aeef] text-sm">{activity.tag}</span>
                                  <span className="text-white px-2 py-0.5 rounded-full bg-[#97aeef] text-sm">{activity.priceRange}</span>
                                
                                </div>
    
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
    )
}

export default ActivityTimeline;