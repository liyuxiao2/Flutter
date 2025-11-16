"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from 'next/image'
import planBkg from '../../public/plan bkg.png'
import { usePlanForm } from "./hooks/usePlanForm";
import { usePlanSubmit } from "./hooks/usePlanSubmit";
import { BudgetCard } from "@/components/plan/BudgetCard";
import { TimeCard } from "@/components/plan/TimeCard";
import { TagInputCard } from "@/components/plan/TagInputCard";

export default function PlanDate() {
  const {
    formData,
    setFormData,
    tags,
    expandedSection,
    handleChange,
    toggleSection,
    addTag,
    removeTag,
    handleClearAll,
  } = usePlanForm();

  const { loading, error, responseData, handleSubmit } = usePlanSubmit(formData, tags);

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
        <div className="absolute inset-0 bg-black bg-opacity-30" />
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
              <BudgetCard
                isExpanded={expandedSection === "budget"}
                onToggle={() => toggleSection("budget")}
                value={formData.budget}
                onChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
              />

              <TimeCard
                isExpanded={expandedSection === "time"}
                onToggle={() => toggleSection("time")}
                value={formData.time}
                onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
              />

              <TagInputCard
                title="Aesthetic"
                isExpanded={expandedSection === "aesthetic"}
                onToggle={() => toggleSection("aesthetic")}
                placeholder="Outdoors, fancy, 2000s.."
                description="Describe what vibe you're going for"
                inputValue={formData.aesthetic}
                onInputChange={(value) => setFormData((prev) => ({ ...prev, aesthetic: value }))}
                tags={tags.aesthetic}
                onAddTag={(e) => addTag("aesthetic", formData.aesthetic, e)}
                onRemoveTag={(tag) => removeTag("aesthetic", tag)}
                cardPlaceholder="Add keywords"
              />

              <TagInputCard
                title="Location"
                isExpanded={expandedSection === "location"}
                onToggle={() => toggleSection("location")}
                placeholder="Add a city, venue, or area..."
                description="Where you're planning your date"
                inputValue={formData.location}
                onInputChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                tags={tags.location}
                onAddTag={(e) => addTag("location", formData.location, e)}
                onRemoveTag={(tag) => removeTag("location", tag)}
                cardPlaceholder="Add Location"
              />

              <TagInputCard
                title="Allergies"
                isExpanded={expandedSection === "allergies"}
                onToggle={() => toggleSection("allergies")}
                placeholder="Search here"
                description=""
                inputValue={formData.allergies}
                onInputChange={(value) => setFormData((prev) => ({ ...prev, allergies: value }))}
                tags={tags.allergies}
                onAddTag={(e) => addTag("allergies", formData.allergies, e)}
                onRemoveTag={(tag) => removeTag("allergies", tag)}
                cardPlaceholder="Add Restrictions"
              />

              <TagInputCard
                title="Inspiration"
                isExpanded={expandedSection === "inspiration"}
                onToggle={() => toggleSection("inspiration")}
                placeholder="Pinterest.com/inspiration"
                description="Upload pictures of your dream date"
                inputValue={formData.inspiration}
                onInputChange={(value) => setFormData((prev) => ({ ...prev, inspiration: value }))}
                tags={tags.inspiration}
                onAddTag={(e) => addTag("inspiration", formData.inspiration, e)}
                onRemoveTag={(tag) => removeTag("inspiration", tag)}
                cardPlaceholder="Add links"
              />
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
  );
}
