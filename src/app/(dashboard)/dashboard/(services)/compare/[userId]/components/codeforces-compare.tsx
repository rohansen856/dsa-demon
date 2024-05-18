"use client"

import { useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { CodeforcesRatingGraph } from "@/app/(dashboard)/dashboard/profiles/codeforces/components/rating-graph"
import { ContestResult } from "@/app/(dashboard)/dashboard/profiles/codeforces/components/types"

import { getCodeforcesStats, getLeetcodeStats } from "./actions"

export function CodeforcesCompare({
  username,
  opponentname,
}: {
  username: string
  opponentname: string
}) {
  const [userdData, setUserdData] = useState<ContestResult | null>(null)
  const [opponentData, setOpponentData] = useState<ContestResult | null>(null)

  async function getData() {
    const user = await getCodeforcesStats(username)
    const opponent = await getCodeforcesStats(opponentname)
    setUserdData(user)
    setOpponentData(opponent)
  }

  useEffect(() => {
    getData()
  }, [])

  if (!userdData || !opponentData)
    return <Skeleton className="h-72 w-full rounded bg-background" />
  return (
    <div className="flex flex-wrap justify-center">
      <div>
        <CodeforcesRatingGraph
          maxRating={
            userdData.result.map((el) => el.newRating).sort((a, b) => b - a)[0]
          }
          data={userdData.result}
        />
        <p className="text-center">{username}&apos;s Graph</p>
      </div>
      <div>
        <CodeforcesRatingGraph
          maxRating={
            opponentData.result
              .map((el) => el.newRating)
              .sort((a, b) => b - a)[0]
          }
          data={opponentData.result}
        />
        <p className="text-center">{opponentname}&apos;s Graph</p>
      </div>
    </div>
  )
}
