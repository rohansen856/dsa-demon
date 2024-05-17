import { redirect } from "next/navigation"
import axios from "axios"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { ProfileCard } from "../components/profile-card"
import { DifficultyChart } from "./components/difficulty-chart"
import { LeetcodeTotalSubmissionsSchema } from "./components/types"

export default async function Leetcode() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }
  // Find if the profile exists.
  const profile = await db.profile.findFirst({
    where: { userId: user.id },
    select: { leetcode: true },
  })

  if (!profile || !profile.leetcode) return "account not set"

  let userData
  try {
    const { data, status } = await axios.get(
      `${env.LEETCODE_API_ROUTE}${profile?.leetcode}`
    )
    if (!data) return "account not found"

    userData = LeetcodeTotalSubmissionsSchema.parse(data)
  } catch (error) {
    userData = null
  }
  if (!userData) return "account not found"

  return (
    <div className="flex pt-4">
      <div className="flex w-full flex-col items-center justify-between xl:flex-row">
        <ProfileCard
          username={profile.leetcode}
          url={`https://leetcode.com/u/${profile.leetcode}`}
        />
        <div className="p-2">
          <DifficultyChart
            hard={userData.hardSolved}
            medium={userData.mediumSolved}
            easy={userData.easySolved}
          />
          <p className="rounded bg-secondary p-2 text-center">
            Total Solved: {userData.totalSolved}
          </p>
        </div>
        <div className="p-2">
          <DifficultyChart
            hard={
              userData.matchedUserStats.totalSubmissionNum.find(
                (item) => item.difficulty === "Hard"
              )?.submissions || 0
            }
            medium={
              userData.matchedUserStats.totalSubmissionNum.find(
                (item) => item.difficulty === "Medium"
              )?.submissions || 0
            }
            easy={
              userData.matchedUserStats.totalSubmissionNum.find(
                (item) => item.difficulty === "Easy"
              )?.submissions || 0
            }
          />
          <p className="rounded bg-secondary p-2 text-center">
            Total Submissions:{" "}
            {userData.matchedUserStats.totalSubmissionNum.find(
              (item) => item.difficulty === "All"
            )?.submissions || 0}
          </p>
        </div>
      </div>
    </div>
  )
}
