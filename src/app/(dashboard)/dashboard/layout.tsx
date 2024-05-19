import Link from "next/link"
import { redirect } from "next/navigation"
import { Triangle } from "lucide-react"

import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { NotificationButton } from "@/components/shared/notification-button"
import { SiteFooter } from "@/components/shared/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

import { Sidemenu } from "./components/side-menu"

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
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <Sidemenu />
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Dsa-Demon</h1>
          <div className="m-auto mr-4 flex items-center gap-4 md:gap-8 lg:mr-16 xl:gap-12 2xl:mr-24">
            <NotificationButton userId={user.id} />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </header>
        <main className="flex w-full flex-1 flex-col overflow-hidden p-2 md:p-6 xl:p-10">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
