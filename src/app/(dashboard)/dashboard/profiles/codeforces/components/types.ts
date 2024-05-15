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
export const UserSchema = z.object({
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
