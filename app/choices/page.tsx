"use client";

import type React from "react";
import { ArrowLeft, Filter, Plus, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const scrollbarHideClass = `
  [&::-webkit-scrollbar]:hidden
  [-ms-overflow-style:'none']
  [scrollbar-width:'none']
`;

interface Activity {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  tag: string;
  priceRange: string;
  image: string;
}

interface Category {
  id: number;
  time: string;
  title: string;
  activities: Activity[];
}

const activities: Activity[] = [
  { id: 1, name: "Danny's Activity", rating: 5, reviews: 390, tag: "Greek", priceRange: "~$20", image: "https://example.com/image1.png" },
  { id: 2, name: "Sushi Delight", rating: 4, reviews: 280, tag: "Japanese", priceRange: "~$30", image: "https://example.com/image2.png" },
  { id: 3, name: "Pasta Paradise", rating: 4, reviews: 450, tag: "Italian", priceRange: "~$25", image: "https://example.com/image3.png" },
  { id: 4, name: "Taco Fiesta", rating: 5, reviews: 320, tag: "Mexican", priceRange: "~$15", image: "https://example.com/image4.png" },
  { id: 5, name: "Burger Bliss", rating: 4, reviews: 550, tag: "American", priceRange: "~$18", image: "https://example.com/image5.png" },
  { id: 6, name: "Yummy Tummy", rating: 5, reviews: 360, tag: "Chinese", priceRange: "~$19", image: "https://example.com/image5.png" },
];

const categories: Category[] = [
  { id: 1, time: "12:00 pm", title: "A Table for Two, Please", activities: activities.slice() },
  { id: 2, time: "1:30 pm", title: "Picture-Perfect Moment", activities: activities.slice() },
  { id: 3, time: "2:00 pm", title: "A Stroll Through Time", activities: activities.slice()},
  { id: 4, time: "3:00 pm", title: "Hello", activities: activities.slice()},
];

const ActivityTimeline: React.FC = () => {
  return (
    <div className="absolute bg-[#fbfbfb] top-0 w-screen h-screen overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1">
            <ArrowLeft className="w-5 h-5 text-[#474747]" />
          </button>
          <h1 className="font-alice text-p1 text-[#474747]">Search results</h1>
        </div>
        <button className="p-1">
          <Filter className="w-5 h-5 text-[#474747]" />
        </button>
      </header>

      {/* Categorys Timeline */}
      <div className="relative px-4 py-6">
        <div className="absolute left-9 top-9 bottom-0 w-px bg-[#474747]" />
        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              {/* Category Dot */}
              <div className="absolute left-4 top-2 w-2 h-2 rounded-full bg-[#474747] -translate-x-[0px]" />

              {/* Category Details */}
              <div className="pl-12">
                <h2 className="font-alice text-h2 text-[#474747] mb-0.5">{category.title}</h2>
                <p className="font-instrument text-p1 text-[#474747] mb-1">{category.time}</p>

                {/* Activitys */}
                <div className={cn("overflow-x-auto pb-4 -mx-4 px-4", scrollbarHideClass)}>
                  <div className="flex gap-4 min-w-min">
                    {category.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-white rounded-3xl shadow-sm overflow-hidden flex-shrink-0"
                        style={{ width: "min(100%, 246px)", height: "245px" }}
                      >
                        {/* Activity Image */}
                        <div className="aspect-[2/1] bg-[#97aeef]" />

                        {/* Activity Info */}
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-alice text-p1 text-[#474747] mb-0.5">{activity.name}</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex gap-1">
                                  {[...Array(activity.rating)].map((_, i) => (
                                    <span key={i} className="inline-block">
                                      <span className="relative flex items-center justify-center w-5 h-5 bg-[#fc7a4b] rounded-md">
                                        <span className="text-white">★</span>
                                      </span>
                                    </span>
                                  ))}
                                </div>
                                <span className="font-instrument text-p3 text-[#474747]">({activity.reviews}+)</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-[#97aeef]/20 text-sm">{activity.tag}</span>
                                <span className="px-2 py-0.5 rounded-full bg-[#97aeef]/20 text-sm">{activity.priceRange}</span>
                              </div>
                            </div>
                            <button className="p-1 rounded-full bg-[#fc7a4b]">
                              <Plus className="w-4 h-4 text-white" />
                            </button>
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

      {/* Finalize Button */}
      <div className="fixed bottom-6 right-6">
        <button className="px-6 py-3 rounded-full bg-[#fc7a4b] text-white flex items-center gap-2 shadow-lg">
          <Heart className="w-5 h-5" />
          <span className="font-instrument text-p1">Finalize</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityTimeline;
