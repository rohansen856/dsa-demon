"use server"

import axios from "axios"

import { env } from "@/env.mjs"
import {
  ContestResult,
  ContestResultSchema,
} from "@/app/(dashboard)/dashboard/profiles/codeforces/components/types"
import {
  LeetcodeTotalSubmissionsSchema,
  type LeetcodeTotalSubmissionsSchemaProps,
} from "@/app/(dashboard)/dashboard/profiles/leetcode/components/types"

export async function getLeetcodeStats(
  username: string
): Promise<LeetcodeTotalSubmissionsSchemaProps | null> {
  try {
    const { data } = await axios.get(`${env.LEETCODE_API_ROUTE}${username}`)
    if (!data) return null
    return LeetcodeTotalSubmissionsSchema.parse(data)
  } catch (error) {
    return null
  }
}

export async function getCodeforcesStats(
  username: string
): Promise<ContestResult | null> {
  try {
    const { data } = await axios.get(
      `${env.CODEFORCES_RATING_ROUTE}${username}`
    )
    if (!data) return null
    return ContestResultSchema.parse(data)
  } catch (error) {
    return null
  }
}
