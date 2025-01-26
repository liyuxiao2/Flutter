import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to AI Date Planner</h1>
      <p className="mb-8">Plan your perfect date with the help of AI</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/plan">Plan a Date</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/profile">Your Profile</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/funny">funny</Link>
        </Button>
      </div>
    </div>
  )
}

