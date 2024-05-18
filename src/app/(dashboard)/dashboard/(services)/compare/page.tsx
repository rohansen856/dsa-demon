"use client"

import { useState } from "react"
import { redirect, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export default function Compare() {
  const [id, setId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>User Id</CardTitle>
        <CardDescription>Enter the User Id to compare.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input
            placeholder="ex. clwbxesmc00036ync3bwfhicv"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={() => {
            setLoading(true)
            router.push(`http://localhost:3000/dashboard/compare/${id}`)
          }}
        >
          {isLoading ? <Icons.spinner className="animate-spin" /> : "Compare"}
        </Button>
      </CardFooter>
    </Card>
  )
}
