import { z } from "zod"

// TypeScript type definition
export interface User {
  handle: string
  email?: string
  vkId?: string
  openId?: string
  firstName?: string
  lastName?: string
  country?: string
  city?: string
  organization?: string
  contribution: number
  rank: string
  rating: number
  maxRank: string
  maxRating: number
  lastOnlineTimeSeconds: number
  registrationTimeSeconds: number
  friendOfCount: number
  avatar: string
  titlePhoto: string
}

// Zod object schema
export const CFUserSchema = z.object({
  handle: z.string(),
  email: z.string().optional(),
  vkId: z.string().optional(),
  openId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  organization: z.string().optional(),
  contribution: z.number(),
  rank: z.string(),
  rating: z.number(),
  maxRank: z.string(),
  maxRating: z.number(),
  lastOnlineTimeSeconds: z.number(),
  registrationTimeSeconds: z.number(),
  friendOfCount: z.number(),
  avatar: z.string(),
  titlePhoto: z.string(),
})

// Define TypeScript types
export interface ContestData {
  contestId: number
  contestName: string
  handle: string
  rank: number
  ratingUpdateTimeSeconds: number
  oldRating: number
  newRating: number
}

export interface ContestResult {
  status: string
  result: ContestData[]
}

// Define Zod schema
export const ContestDataSchema = z.object({
  contestId: z.number(),
  contestName: z.string(),
  handle: z.string(),
  rank: z.number(),
  ratingUpdateTimeSeconds: z.number(),
  oldRating: z.number(),
  newRating: z.number(),
})

export const ContestResultSchema = z.object({
  status: z.string(),
  result: z.array(ContestDataSchema),
})

// Example usage:
export const data: ContestResult = {
  status: "OK",
  result: [
    {
      contestId: 1920,
      contestName: "Codeforces Round 919 (Div. 2)",
      handle: "rohansen856",
      rank: 13097,
      ratingUpdateTimeSeconds: 1705163700,
      oldRating: 0,
      newRating: 397,
    },
    // Add more contest data objects here
  ],
}
