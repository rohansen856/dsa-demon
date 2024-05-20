import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { Mail } from "./components/mail"
import { accounts } from "./data"

export default async function MailPage() {
  const user = await getCurrentUser()
  if (!user) return redirect("/login")
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = (layout ? JSON.parse(layout.value) : undefined) as
    | number[]
    | undefined
  const defaultCollapsed = (
    collapsed ? JSON.parse(collapsed.value) : undefined
  ) as boolean | undefined

  const mails = await db.notifications.findMany({
    where: { receiverId: user.id },
  })

  return (
    <div className="-m-10">
      <div className="md:hidden">Not supported for small screen yet</div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </div>
  )
}
