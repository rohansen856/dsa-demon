import { redirect } from "next/navigation"
import axios from "axios"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Separator } from "@/components/ui/separator"

import { CardDemo } from "../components/profile-card"
import { RankMeter } from "./components/rank-meter"
import { RatingGraph } from "./components/rating-graph"
import { CFUserSchema, ContestResultSchema } from "./components/types"

export default async function Codeforces() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }
  // Find if the profile exists.
  const profile = await db.profile.findFirst({
    where: { userId: user.id },
    select: { codeforces: true },
  })

  if (!profile || !profile.codeforces) return "account not set"

  const {
    data: { status, result },
  } = await axios.get(`${env.CODEFORCES_API_ROUTE}${profile.codeforces}`)
  if (status !== "OK") return "account not found"
  const userData = CFUserSchema.parse(result[0])

  const { data, statusText } = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${profile.codeforces}`
  )
  if (!data) return "account not found"
  const ratingData = ContestResultSchema.parse(data)

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <div className="flex w-full flex-col items-center justify-between xl:flex-row">
        <CardDemo />
        <div className="p-2">
          <RankMeter rating={userData.rating} rank={userData.rank} />
          <p className="rounded p-2 text-center">Rating: {userData.rating}</p>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="mt-10 overflow-x-auto p-2">
        <RatingGraph maxRating={userData.maxRating} data={ratingData.result} />
        <p className="rounded p-2 text-center">
          Rating Graph [Max: {userData.maxRating}]
        </p>
      </div>
    </div>
  )
}
