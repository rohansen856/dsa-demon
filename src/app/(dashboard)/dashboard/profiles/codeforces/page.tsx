import { redirect } from "next/navigation"
import axios from "axios"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Separator } from "@/components/ui/separator"

import { ProfileCard } from "../components/profile-card"
import { RankMeter } from "./components/rank-meter"
import { CodeforcesRatingGraph } from "./components/rating-graph"
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

  let userData
  try {
    const result = await axios.get(
      `${env.CODEFORCES_API_ROUTE}${profile.codeforces}`
    )
    if (result.data["result"].length <= 0) return "account not found"
    userData = CFUserSchema.parse(result.data["result"][0])
  } catch (error) {
    userData = null
  }
  if (!userData) return "account not found"

  const { data } = await axios.get(
    `${env.CODEFORCES_RATING_ROUTE}${profile.codeforces}`
  )
  if (!data) return "account not found"
  const ratingData = ContestResultSchema.parse(data)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-between gap-4 lg:items-start xl:flex-row">
        <ProfileCard
          username={profile.codeforces}
          url={`https://codeforces.com/profile/${profile.codeforces}`}
        />
        <div className="p-2">
          <RankMeter rating={userData.rating} rank={userData.rank} />
          <p className="rounded bg-secondary p-2 text-center">
            Rating: {userData.rating}
          </p>
        </div>
        <div className="overflow-x-auto rounded bg-secondary px-2">
          <CodeforcesRatingGraph
            maxRating={userData.maxRating}
            data={ratingData.result}
          />
          <p className="rounded bg-secondary p-2 text-center">
            Rating Graph [Max: {userData.maxRating}]
          </p>
        </div>
      </div>
    </div>
  )
}
