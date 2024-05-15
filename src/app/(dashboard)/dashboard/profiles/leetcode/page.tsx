import axios from "axios"

import { env } from "@/env.mjs"

import { CardDemo } from "./components/leetcode-card"
import { TotalSubmissionsSchema } from "./components/types"

export default async function Leetcode() {
  const { data, status } = await axios.get(
    `${env.LEETCODE_API_ROUTE}/rohansen856`
  )
  if (!data) return
  const userData = TotalSubmissionsSchema.parse(data)
  return (
    <div className="flex pt-4">
      <div className="flex items-center justify-center">
        <CardDemo />
        <div className="rounded-lg bg-secondary p-2">
          <pre>{JSON.stringify(userData)}</pre>
        </div>
      </div>
    </div>
  )
}
