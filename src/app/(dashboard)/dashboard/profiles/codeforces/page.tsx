import axios from "axios"

import { env } from "@/env.mjs"

import { CardDemo } from "../components/profile-card"
import { UserSchema } from "./components/types"

export default async function Codeforces() {
  const {
    data: { status, result },
  } = await axios.get(`${env.CODEFORCES_API_ROUTE}/rohansen856`)
  if (status != "OK") return
  const userData = UserSchema.parse(result[0])
  return (
    <div className="flex pt-4">
      <div className="flex items-center justify-center">
        <CardDemo />
        <div className="rounded-lg bg-secondary p-2">
          <pre>{JSON.stringify(userData.maxRating)}</pre>
        </div>
      </div>
    </div>
  )
}
