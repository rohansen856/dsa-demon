import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

import { OverallSolved } from "./components/overall"

export const metadata = {
  title: "Profiles",
  description: "Manage account and website Profiles.",
}

export default async function ProfilesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex size-full">
      <div className="flex flex-col items-center justify-center">
        <OverallSolved />
        <p>Questions solved</p>
      </div>
    </div>
  )
}
// https://leetcode-api-faisalshohag.vercel.app/rohansen856
