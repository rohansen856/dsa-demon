import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { ProfileTabButton } from "./components/profile-tab-button"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Coding Profiles"
        text="Manage account and website Profiles."
      />
      <div className="flex w-full flex-wrap justify-center gap-4 p-2">
        <ProfileTabButton />
        <main className="grow">{children}</main>
      </div>
    </DashboardShell>
  )
}
