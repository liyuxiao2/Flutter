"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDisplay } from "../FormData/page";

export default function PlanDate() {
  const [formData, setFormData] = useState({
    budget: "",
    time: "",
    style: "",
    location: "",
    dietary: "",
    inspiration: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for better UX
  const [responseData, setResponseData] = useState<any>(null); // Store the response data

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Parse inspiration into an array of strings (splitting by new line)
      const parsedFormData = {
        ...formData,
        inspiration: formData.inspiration.split("\n").map((line) => line.trim()).filter(Boolean), // Split and trim
      };

      const response = await fetch("http://127.0.0.1:5000/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedFormData), // Sending parsed formData to backend
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json(); // Directly parse the JSON response
      setResponseData(result); // Update the state with the parsed response
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Plan Your Date</CardTitle>
        <CardDescription>Fill in your preferences to get a personalized date plan</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                name="budget"
                placeholder="Enter your budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="time">Time Constraint</Label>
              <Input
                id="time"
                name="time"
                placeholder="Enter your time constraint"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="style">Style Preference</Label>
              <Input
                id="style"
                name="style"
                placeholder="Enter style keywords"
                value={formData.style}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="style">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter in location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dietary">Dietary Preferences/Allergies</Label>
              <Input
                id="dietary"
                name="dietary"
                placeholder="Enter dietary preferences or allergies"
                value={formData.dietary}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="inspiration">Inspiration (Pinterest board links or image URLs)</Label>
              <Textarea
                id="inspiration"
                name="inspiration"
                placeholder="Enter inspiration links (one per line)"
                value={formData.inspiration}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Date Plan"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {/* Pass responseData to FormDisplay */}
        {responseData && <FormDisplay FormData={responseData} />}
      </CardFooter>
    </Card>
  );
}
