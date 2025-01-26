"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image'
import planBkg from '../images/plan bkg.png'
import { useRouter } from "next/navigation";

export default function PlanDate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    budget: 80,
    time: 3,
    aesthetic: "",
    location: "",
    allergies: "",
    inspiration: "",
  });

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [tags, setTags] = useState<{
    aesthetic: string[];
    location: string[];
    allergies: string[];
    inspiration: string[];
  }>({
    aesthetic: ["Casual", "Romantic"],
    location: [],
    allergies: ["Peanuts", "Vegan"],
    inspiration: [],
  });
  

  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const addTag = (section: keyof typeof tags, value: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const trimmedValue = value.trim();
  
    if (trimmedValue && !tags[section].includes(trimmedValue)) {
      setTags((prev) => ({
        ...prev,
        [section]: [...(prev[section] as string[]), trimmedValue], // Explicitly assert type as string[]
      }));
      setFormData((prev) => ({ ...prev, [section]: "" })); // Reset the corresponding input field
    }
  };
  

  
  const removeTag = (section: keyof typeof tags, tag: string) => {
    setTags((prev) => ({
      ...prev,
      [section]: prev[section].filter((t) => t !== tag),
    }));
  };

  const handleClearAll = () => {
    setFormData({
      budget: 80,
      time: 3,
      aesthetic: "",
      location: "",
      allergies: "",
      inspiration: "",
    });
    setTags({
      aesthetic: [],
      location: [],
      allergies: [],
      inspiration: [],
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: formData.budget.toString(),
          time: `${formData.time} hours`,
          style: tags.aesthetic,
          location: tags.location,
          dietary: tags.allergies,
          inspiration: tags.inspiration,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result", result);

      // Redirect to the `/choices` page with itinerary data passed as query parameters
      const queryParams = new URLSearchParams({
        categories: JSON.stringify(result.restaurants || []),
        activities: JSON.stringify(result.activities || []),
      });

      router.push(`/choices?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="absolute left-0 right-0 top-0 bg-[#F5F4F4] border-t">
      {/* Header */}
      <div className="relative flex justify-center items-center bg-black h-screen md:h-[600px] pt-20 pr-24">
        <Image
          src={planBkg}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" /> {/* Overlay for better text visibility */}
        <div className="relative z-10 text-white text-left">
          <h1 className="text-6xl font-bold mb-4">
            Plan <span className="text-[#FC7A4B] italic">the</span> date.
          </h1>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
          You know, the date where you can't stop feeling butterflies and you know you've met the one. Bring that moment to life by telling us about yourself.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-24 drop-shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
        <div className="max-w-2xl mx-auto px-4 space-y-4 p-24">
        <div className="flex-1 pb-24 drop-shadow-[0_2px_6px_rgba(0,0,0,0.0)]">
        <div className="max-w-2xl mx-auto px-4 space-y-4 p-4">
         {/* Budget Card */}
         <Card className="shadow-sm rounded-2xl">
            <div className="w-full p-6">
              <div onClick={() => toggleSection("budget")} className="w-full cursor-pointer">
                <div className="flex justify-between items-center">
                  <h2 className={`font-serif ${expandedSection === "budget" ? "text-3xl" : "text-2xl"}`}>Budget</h2>
                  {(!expandedSection || expandedSection !== "budget") && (
                    <span className="text-gray-500">Add budget</span>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedSection === "budget" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1">
                      <p className="text-md text-gray-600 mb-4">Find the perfect date for any budget</p>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={formData.budget}
                        onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                        className="w-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FC7A4B] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#97AEEF] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#97AEEF] [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #97AEEF ${(formData.budget / 500) * 100}%, #E2E8F0 ${(formData.budget / 500) * 100}%, #E2E8F0 100%)`,
                          height: "8px",
                          borderRadius: "9999px",
                        }}
                      />
                      <div className="text-center mt-2">${formData.budget}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>


          {/* Other Cards (e.g., Time, Allergies, etc.) */}
          {/* Include similar structure for Time, Allergies, etc. */}

          {/* Plan Button */}

      

          {/* Time Card */}
          <Card className="shadow-sm rounded-2xl">
            <div className="w-full p-6">
              <div onClick={() => toggleSection("time")} className="w-full cursor-pointer">
                <div className="flex justify-between items-center">
                  <h2 className={`font-serif ${expandedSection === "time" ? "text-3xl" : "text-2xl"}`}>Time</h2>
                  {(!expandedSection || expandedSection !== "time") && (
                    <span className="text-gray-500">Add length</span>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedSection === "time" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1">
                      <p className="text-md text-gray-600 mb-4">
                        From a quick meal to a day trip around the city we've got you covered
                      </p>
                      <input
                        type="range"
                        min="0.5"
                        max="12"
                        step="0.5"
                        value={formData.time}
                        onChange={(e) => setFormData((prev) => ({ ...prev, time: Number(e.target.value) }))}
                        className="w-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FC7A4B] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#97AEEF] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#97AEEF] [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, white 0%, #97AEEF ${(formData.time / 12) * 100}%, #E2E8F0 ${(formData.time / 12) * 100}%, #E2E8F0 100%)`,
                          height: "8px",
                          borderRadius: "9999px",
                        }}
                      />
                      <div className="text-center mt-2">{formData.time.toFixed(1)} hours</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* Aesthetic Card */}
          <Card className="shadow-sm rounded-2xl">
            <div className="w-full p-6">
              <div onClick={() => toggleSection("aesthetic")} className="w-full cursor-pointer">
                <div className="flex justify-between items-center">
                  <h2 className={`font-serif ${expandedSection === "aesthetic" ? "text-3xl" : "text-2xl"}`}>
                    Aesthetic
                  </h2>
                  {(!expandedSection || expandedSection !== "aesthetic") && (
                    <span className="text-gray-500">Add keywords</span>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedSection === "aesthetic" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1">
                      <p className="text-md text-gray-600 mb-2">Describe what vibe you're going for</p>
                      <div className="relative">
                        <Input
                          value={formData.aesthetic}
                          onChange={handleChange}
                          name="aesthetic"
                          placeholder="Outdoors, fancy, 2000s.."
                          className="rounded-full pr-12"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addTag("aesthetic", formData.aesthetic)
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 hover:bg-orange-200"
                          onClick={(e) => addTag("aesthetic", formData.aesthetic, e)}
                        >
                          <Heart className="h-4 w-4 text-[#FC7A4B]" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.aesthetic.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[#97AEEF] text-sm text-white hover:bg-[#7B97E8]"
                            onClick={() => removeTag("aesthetic", tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* Location Card */}
          <Card className="shadow-sm rounded-2xl">
            <div className="w-full p-6">
              <div onClick={() => toggleSection("location")} className="w-full cursor-pointer">
                <div className="flex justify-between items-center">
                  <h2 className={`font-serif ${expandedSection === "location" ? "text-3xl" : "text-2xl"}`}>
                    Location
                  </h2>
                  {(!expandedSection || expandedSection !== "location") && (
                    <span className="text-gray-500">Add Location</span>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedSection === "location" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2">
                      <p className="text-md text-gray-600 mb-2">Where you're planning your date</p>
                      <div className="flex flex-wrap gap-2 mb-0">
                        {tags.location.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[#97AEEF] text-white hover:bg-[#7B97E8]"
                            onClick={() => removeTag("location", tag)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") removeTag("location", tag);
                            }}
                            tabIndex={0}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                      <div className="relative">
                        <Input
                          value={formData.location}
                          onChange={handleChange}
                          name="location"
                          placeholder="Add a city, venue, or area..."
                          className="rounded-full pr-12"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && formData.location.trim()) {
                              addTag("location", formData.location.trim());
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 hover:bg-orange-200"
                          onClick={(e) => {
                            if (formData.location.trim()) addTag("location", formData.location.trim());
                          }}
                        >
                          <Heart className="h-4 w-4 text-[#FC7A4B]" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>



          {/* Allergies Card */}
          <Card className="shadow-sm rounded-2xl">
            <div className="w-full p-6">
              <div onClick={() => toggleSection("allergies")} className="w-full cursor-pointer">
                <div className="flex justify-between items-center">
                  <h2 className={`font-serif ${expandedSection === "allergies" ? "text-3xl" : "text-2xl"}`}>
                    Allergies
                  </h2>
                  {(!expandedSection || expandedSection !== "allergies") && (
                    <span className="text-gray-500">Add Restrictions</span>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedSection === "allergies" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2">
                      <div className="relative">
                        <Input
                          value={formData.allergies}
                          onChange={handleChange}
                          name="allergies"
                          placeholder="Search here"
                          className="rounded-full pr-12"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addTag("allergies", formData.allergies)
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 hover:bg-orange-200"
                          onClick={(e) => addTag("allergies", formData.allergies, e)}
                        >
                          <Heart className="h-4 w-4 text-[#FC7A4B]" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.allergies.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-sm bg-[#97AEEF] text-white hover:bg-[#7B97E8]"
                            onClick={() => removeTag("allergies", tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* Inspiration Card */}
          <Card className="shadow-sm rounded-2xl">
            <div className="w-full p-6">
              <div onClick={() => toggleSection("inspiration")} className="w-full cursor-pointer">
                <div className="flex justify-between items-center">
                  <h2 className={`font-serif ${expandedSection === "inspiration" ? "text-3xl" : "text-2xl"}`}>
                    Inspiration
                  </h2>
                  {(!expandedSection || expandedSection !== "inspiration") && (
                    <span className="text-gray-500">Add links</span>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedSection === "inspiration" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2">
                      <p className="text-md text-gray-600 mb-2">
                        Upload pictures of your dream date 
                      </p>
                      <div className="relative">
                        <Input
                          value={formData.inspiration}
                          onChange={handleChange}
                          name="inspiration"
                          placeholder="Pinterest.com/inspiration"
                          className="rounded-full pr-12"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addTag("inspiration", formData.inspiration)
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 hover:bg-orange-200"
                          onClick={(e) => addTag("inspiration", formData.inspiration, e)}
                        >
                          <Heart className="h-4 w-4 text-[#FC7A4B]" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.inspiration.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-sm bg-[#97AEEF] text-white hover:bg-[#7B97E8]"
                            onClick={() => removeTag("inspiration", tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>


          {/* Response Display */}
          {loading && (
            <div className="text-center text-gray-500 py-4">
              Planning your perfect date...
            </div>
          )}

          {error && (
            <Card className="bg-red-50 border-red-200 text-red-800 p-4">
              <p>Error: {error}</p>
            </Card>
          )}

          {responseData && (
            <Card className="shadow-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Your Personalized Date Plan</h2>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Activities</h3>
                  {responseData.activities?.map((activity: any, index: number) => (
                    <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-bold">{activity.name}</h4>
                      <p>{activity.description}</p>
                      {activity.time && <p className="text-sm text-gray-600">Time: {activity.time}</p>}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Restaurants</h3>
                  {responseData.restaurants?.map((restaurant: any, index: number) => (
                    <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-bold">{restaurant.name}</h4>
                      <p>{restaurant.description}</p>
                      <p className="text-sm text-gray-600">
                        Cuisine: {restaurant.cuisine}
                        {restaurant.rating && ` | Rating: ${restaurant.rating}`}
                      </p>
                      {restaurant.address && <p className="text-sm">Address: {restaurant.address}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-2xl mx-auto px-10 py-4 flex justify-between items-center">
          <button 
            className="text-gray-500 hover:text-gray-700 underline"
            onClick={handleClearAll}
          >
            Clear All
          </button>
          <Button
            onClick={handleSubmit}
            className="px-8 py-2 bg-[#FC7A4B] hover:bg-[#FC7A4B]/90 text-white rounded-full"
            disabled={loading}
          >
            {loading ? "Planning..." : "Plan"}
          </Button>
        </div>
      </div>
    </div>
  )
}
