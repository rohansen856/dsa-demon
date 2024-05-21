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
    { difficulty: string; user: number; opponent: number }[]
  >([])
  const [attemptedData, setAttemptedData] = useState<
    { difficulty: string; user: number; opponent: number }[]
  >([])
  async function getData() {
    const userData = await getLeetcodeStats(username)
    const opponentData = await getLeetcodeStats(opponentname)

    setSolvedData([
      {
        difficulty: "All",
        user: userData?.totalSolved ?? 0,
        opponent: opponentData?.totalSolved ?? 0,
      },
      {
        difficulty: "Hard",
        user: userData?.hardSolved ?? 0,
        opponent: opponentData?.hardSolved ?? 0,
      },
      {
        difficulty: "Medium",
        user: userData?.mediumSolved ?? 0,
        opponent: opponentData?.mediumSolved ?? 0,
      },
      {
        difficulty: "Easy",
        user: userData?.easySolved ?? 0,
        opponent: opponentData?.easySolved ?? 0,
      },
    ])

    setAttemptedData([
      {
        difficulty: userData?.totalSubmissions[0].difficulty ?? "",
        user: userData?.totalSubmissions[0].submissions ?? 0,
        opponent: opponentData?.totalSubmissions[0].submissions ?? 0,
      },
      {
        difficulty: userData?.totalSubmissions[1].difficulty ?? "",
        user: userData?.totalSubmissions[1].submissions ?? 0,
        opponent: opponentData?.totalSubmissions[1].submissions ?? 0,
      },
      {
        difficulty: userData?.totalSubmissions[2].difficulty ?? "",
        user: userData?.totalSubmissions[2].submissions ?? 0,
        opponent: opponentData?.totalSubmissions[2].submissions ?? 0,
      },
      {
        difficulty: userData?.totalSubmissions[3].difficulty ?? "",
        user: userData?.totalSubmissions[3].submissions ?? 0,
        opponent: opponentData?.totalSubmissions[3].submissions ?? 0,
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
        <LeetcodeQuestionsGraph data={solvedData} />
        <p className="text-center">Total Solved</p>
      </div>
      <div>
        <LeetcodeQuestionsGraph data={attemptedData} />
        <p className="text-center">Total Attempted</p>
      </div>
    </div>
  )
}
