"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    budgetPreference: "",
    allergies: "",
    favoriteActivities: "",
  })

  const [message, setMessage] = useState(""); // State for feedback messages

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try{
      const response = await fetch('http://127.0.0.1:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      });
  
      const result = await response.json();

      setMessage("Profile updated successfully!");

      console.log(result)
    }
    catch (error) {
      console.log('ERROR', error);

      setMessage("Something went wrong");
    }
    
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Update your personal information and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="budgetPreference">Budget Preference</Label>
              <Input
                id="budgetPreference"
                name="budgetPreference"
                value={profile.budgetPreference}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="allergies">Allergies</Label>
              <Input id="allergies" name="allergies" value={profile.allergies} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="favoriteActivities">Favorite Activities</Label>
              <Textarea
                id="favoriteActivities"
                name="favoriteActivities"
                value={profile.favoriteActivities}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button className="w-full" type="submit" onClick={handleSubmit}>
            Update Profile
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </CardFooter>


    </Card>
  )
}

