import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Separator } from "@/components/ui/separator"

import { GroupsForm } from "./components/group-form"

interface GroupsLayoutProps {
  children?: React.ReactNode
}

export default async function GroupsLayout({ children }: GroupsLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const myGroups = await db.groups.findMany({
    where: { userId: user.id },
  })

  return (
    <div className="flex w-full flex-wrap gap-4">
      <GroupsForm groups={myGroups} />
      {children}
    </div>
  )
}
