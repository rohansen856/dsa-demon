import { cookies } from "next/headers"

import { Mail } from "./components/mail"
import { accounts, mails } from "./data"

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = (layout ? JSON.parse(layout.value) : undefined) as
    | number[]
    | undefined
  const defaultCollapsed = (
    collapsed ? JSON.parse(collapsed.value) : undefined
  ) as boolean | undefined

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
