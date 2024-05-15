import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { MainNav } from "@/components/shared/main-nav"
import { DashboardNav } from "@/components/shared/nav"
import { SiteFooter } from "@/components/shared/site-footer"
import { DashboardShell } from "@/components/shell"
import { UserAccountNav } from "@/components/user-account-nav"

import { ProfileTabButton } from "./components/profile-tab-button"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Coding Profiles"
        text="Manage account and website Profiles."
      />
      <div className="w-full p-2">
        <ProfileTabButton />
        {children}
      </div>
    </DashboardShell>
  )
}
