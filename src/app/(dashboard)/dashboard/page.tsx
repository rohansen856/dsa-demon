import { redirect } from "next/navigation"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"

import { ProfilesForm } from "./components/profiles-form"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const profiles = await db.profile.findUnique({
    where: { userId: user.id },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="mb-6 flex flex-col items-start gap-6 rounded-lg bg-secondary p-4">
        <div className="flex flex-col rounded-full border-4 border-dashed p-2 lg:flex-row">
          <Avatar className="size-32">
            <AvatarImage
              src={user.image ?? "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="">
          <p className="text-md lg:text-xl 2xl:text-3xl">{user.name}</p>
          <span className="space-x-2">
            <Badge className="mt-2">Github</Badge>
            {profiles?.leetcode && <Badge className="mt-2">Leetcode</Badge>}
            {profiles?.codechef && <Badge className="mt-2">Codechef</Badge>}
            {profiles?.codeforces && <Badge className="mt-2">Codeforces</Badge>}
          </span>
        </div>
      </div>
      <ProfilesForm
        leetcode={profiles?.leetcode ?? null}
        codechef={profiles?.codechef ?? null}
        codeforces={profiles?.codeforces ?? null}
      />
    </DashboardShell>
  )
}
