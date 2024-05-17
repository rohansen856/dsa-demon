import { z } from "zod"

export interface LeetcodeSubmissionProps {
  title: string
  titleSlug: string
  timestamp: string
  statusDisplay: string
  lang: string
  __typename: string
}

export interface LeetcodeSubmissionStatsProps {
  difficulty: string
  count: number
  submissions: number
}

export interface UserStats {
  acSubmissionNum: LeetcodeSubmissionStatsProps[]
  totalSubmissionNum: LeetcodeSubmissionStatsProps[]
}

export interface LeetcodeSubmissionCalendarProps {
  [timestamp: number]: number
}

export interface LeetcodeTotalSubmissionsProps {
  difficulty: string
  count: number
  submissions: number
}

export interface LeetcodeTotalSubmissionsSchemaProps {
  totalSolved: number
  totalSubmissions: LeetcodeTotalSubmissionsProps[]
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  ranking: number
  contributionPoint: number
  reputation: number
  submissionCalendar: LeetcodeSubmissionCalendarProps
  recentSubmissions: LeetcodeSubmissionProps[]
  matchedUserStats: UserStats
}

export const LeetcodeSubmissionSchema = z.object({
  title: z.string(),
  titleSlug: z.string(),
  timestamp: z.string(),
  statusDisplay: z.string(),
  lang: z.string(),
  __typename: z.string(),
})

export const LeetcodeSubmissionStatsSchema = z.object({
  difficulty: z.string(),
  count: z.number(),
  submissions: z.number(),
})

export const UserStatsSchema = z.object({
  acSubmissionNum: z.array(LeetcodeSubmissionStatsSchema),
  totalSubmissionNum: z.array(LeetcodeSubmissionStatsSchema),
})

export const LeetcodeSubmissionCalendarSchema = z.record(z.number())

export const LeetcodeTotalSubmissionsSchema = z.object({
  totalSolved: z.number(),
  totalSubmissions: z.array(LeetcodeSubmissionStatsSchema),
  totalQuestions: z.number(),
  easySolved: z.number(),
  totalEasy: z.number(),
  mediumSolved: z.number(),
  totalMedium: z.number(),
  hardSolved: z.number(),
  totalHard: z.number(),
  ranking: z.number(),
  contributionPoint: z.number(),
  reputation: z.number(),
  submissionCalendar: LeetcodeSubmissionCalendarSchema,
  recentSubmissions: z.array(LeetcodeSubmissionSchema),
  matchedUserStats: UserStatsSchema,
})

//demo data

export const data: LeetcodeTotalSubmissionsSchemaProps = {
  totalSolved: 33,
  totalSubmissions: [
    { difficulty: "All", count: 37, submissions: 150 },
    { difficulty: "Easy", count: 14, submissions: 42 },
    { difficulty: "Medium", count: 21, submissions: 103 },
    { difficulty: "Hard", count: 2, submissions: 5 },
  ],
  totalQuestions: 3150,
  easySolved: 13,
  totalEasy: 794,
  mediumSolved: 18,
  totalMedium: 1654,
  hardSolved: 2,
  totalHard: 702,
  ranking: 1819917,
  contributionPoint: 324,
  reputation: 0,
  submissionCalendar: {
    1694736000: 1,
    1696118400: 2,
    1699142400: 15,
    1699401600: 1,
    1699488000: 54,
    1699833600: 6,
    1699920000: 19,
    1701561600: 5,
    1701734400: 16,
    1706918400: 1,
    1707177600: 5,
    1707264000: 5,
    1707350400: 2,
    1707436800: 8,
    1707523200: 3,
    1707696000: 3,
    1707955200: 2,
    1708128000: 2,
  },
  recentSubmissions: [
    {
      title: "Furthest Building You Can Reach",
      titleSlug: "furthest-building-you-can-reach",
      timestamp: "1708198850",
      statusDisplay: "Wrong Answer",
      lang: "typescript",
      __typename: "SubmissionDumpNode",
    },
    {
      title: "Minimum Size Subarray Sum",
      titleSlug: "minimum-size-subarray-sum",
      timestamp: "1708198027",
      statusDisplay: "Accepted",
      lang: "typescript",
      __typename: "SubmissionDumpNode",
    },
    // Add more recent submissions here...
  ],
  matchedUserStats: {
    acSubmissionNum: [
      { difficulty: "All", count: 33, submissions: 50 },
      { difficulty: "Easy", count: 13, submissions: 20 },
      { difficulty: "Medium", count: 18, submissions: 28 },
      { difficulty: "Hard", count: 2, submissions: 2 },
    ],
    totalSubmissionNum: [
      { difficulty: "All", count: 37, submissions: 150 },
      { difficulty: "Easy", count: 14, submissions: 42 },
      { difficulty: "Medium", count: 21, submissions: 103 },
      { difficulty: "Hard", count: 2, submissions: 5 },
    ],
  },
}
