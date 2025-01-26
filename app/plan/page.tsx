"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PlanDate() {
  const [formData, setFormData] = useState({
    budget: 80,
    time: 3,
    aesthetic: "",
    allergies: "",
    inspiration: "",
  });

  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [tags, setTags] = useState({
    aesthetic: ["Casual", "Romantic"],
    allergies: ["Peanuts", "Vegan"],
    inspiration: ["Joanna's Pinterest Board"],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const addTag = (section: keyof typeof tags, value: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (value && !tags[section].includes(value)) {
      setTags((prev) => ({
        ...prev,
        [section]: [...prev[section], value],
      }))
      setFormData((prev) => ({ ...prev, [section]: "" }))
    }
  }

  const removeTag = (section: keyof typeof tags, tag: string) => {
    setTags((prev) => ({
      ...prev,
      [section]: prev[section].filter((t) => t !== tag),
    }))
  }

  return (
    <div className="absolute left-0 right-0 top-0 bg-[F5F4F4] border-t">
      {/* Header */}
      <div className="relative flex justify-center items-center bg-black h-[280px]">
        <Button variant="ghost" className="absolute top-4 left-4 m-4 text-white hover:text-white/80" size="icon">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="p-0 text-white">
          <h1 className="text-6xl font-bold mb-4">
            Plan <span className="text-[#FC7A4B]">the</span> date.
          </h1>
          <p className="text-xl text-gray-300 max-w-md">
            Tell us what you're looking for and we'll give you expert recommendations based on what we know they like.
          </p>
        </div>
      </div>

      {/* Content with proper spacing from fixed header */}
      <div className="flex-1 pb-24 drop-shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
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
                      <p className="text-sm text-gray-600 mb-4">Find the perfect date for any budget</p>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={formData.budget}
                        onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                        className="w-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FC7A4B] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#97AEEF] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#97AEEF] [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, white 0%, #97AEEF ${(formData.budget / 500) * 100}%, #E2E8F0 ${(formData.budget / 500) * 100}%, #E2E8F0 100%)`,
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
                      <p className="text-sm text-gray-600 mb-4">
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
                      <p className="text-sm text-gray-600 mb-2">Describe what vibe you're going for</p>

                      <div className="relative">
                        <Input
                          value={formData.aesthetic}
                          onChange={handleChange}
                          name="aesthetic"
                          placeholder="Outdoors, fancy, 2000s.."
                          className="pr-12 rounded-full"
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
                          className="absolute right-2 top-1/4 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 hover:bg-orange-200"
                          onClick={(e) => addTag("aesthetic", formData.aesthetic, e)}
                        >
                          <Heart className="h-4 w-4 text-[#FC7A4B]" />
                        </Button>
                        <div className="flex flex-wrap gap-2 mt-3">
                        {tags.aesthetic.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[#97AEEF] text-white hover:bg-[#7B97E8]"
                            onClick={() => removeTag("aesthetic", tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
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
                          className="pr-12 rounded-full"
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
                      <div className="flex flex-wrap gap-2 mt-4">
                        {tags.allergies.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[#97AEEF] text-white hover:bg-[#7B97E8]"
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
              <div onClick={() => toggle