"use client"

import { useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { getLeetcodeStats } from "./actions"
import { LeetcodeQuestionsGraph } from "./leetcode-questions-graph"

export function LeetcodeCompare({
  username,
  opponentname,
}: {
  username: string
  opponentname: string
}) {
  const [solvedData, setSolvedData] = useState<
    { difficulty: string; uv: number; pv: number }[]
  >([])
  const [attemptedData, setAttemptedData] = useState<
    { difficulty: string; uv: number; pv: number }[]
  >([])
  async function getData() {
    const userData = await getLeetcodeStats(username)
    const opponentData = await getLeetcodeStats(opponentname)

    setSolvedData([
      {
        difficulty: "All",
        uv: userData?.totalSolved ?? 0,
        pv: opponentData?.totalSolved ?? 0,
      },
      {
        difficulty: "Hard",
        uv: userData?.hardSolved ?? 0,
        pv: opponentData?.hardSolved ?? 0,
      },
      {
        difficulty: "Medium",
        uv: userData?.mediumSolved ?? 0,
        pv: opponentData?.mediumSolved ?? 0,
      },
      {
        difficulty: "Easy",
        uv: userData?.easySolved ?? 0,
        pv: opponentData?.easySolved ?? 0,
      },
    ])

    setAttemptedData([
      {
        difficulty: userData?.totalSubmissions[0].difficulty ?? "",
        uv: userData?.totalSubmissions[0].submissions ?? 0,
        pv: opponentData?.totalSubmissions[0].submissions ?? 0,
      },
      {
        difficulty: userData?.totalSubmissions[1].difficulty ?? "",
        uv: userData?.totalSubmissions[1].submissions ?? 0,
        pv: opponentData?.totalSubmissions[1].submissions ?? 0,
      },
      {
        difficulty: userData?.totalSubmissions[2].difficulty ?? "",
        uv: userData?.totalSubmissions[2].submissions ?? 0,
        pv: opponentData?.totalSubmissions[2].submissions ?? 0,
      },
      {
        difficulty: userData?.totalSubmissions[3].difficulty ?? "",
        uv: userData?.totalSubmissions[3].submissions ?? 0,
        pv: opponentData?.totalSubmissions[3].submissions ?? 0,
      },
    ])
  }

  useEffect(() => {
    getData()
  }, [])

  if (solvedData.length === 0)
    return <Skeleton className="h-72 w-full rounded bg-background" />
  return (
    <div className="flex flex-wrap justify-center">
      <div>
        <LeetcodeQuestionsGraph username={username} data={solvedData} />
        <p className="text-center">Total Solved</p>
      </div>
      <div>
        <LeetcodeQuestionsGraph username={username} data={attemptedData} />
        <p className="text-center">Total Attempted</p>
      </div>
    </div>
  )
}
