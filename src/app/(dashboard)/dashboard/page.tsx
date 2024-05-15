import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="flex items-center gap-6">
        <div className="flex flex-col rounded-full border-4 border-dashed p-2 lg:flex-row">
          <Avatar className="size-32">
            <AvatarImage
              src={user.image ?? "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="h-full">
          <p className="text-md lg:text-xl 2xl:text-3xl">{user.name}</p>
          <span className="space-x-2">
            <Badge className="mt-2 border">Github</Badge>
            <Badge className="mt-2">Github</Badge>
            <Badge className="mt-2">Github</Badge>
            <Badge className="mt-2">Github</Badge>
          </span>
        </div>
      </div>
    </DashboardShell>
  )
}
