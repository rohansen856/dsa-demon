import Link from "next/link"
import { BellDot } from "lucide-react"

export function NotificationButton() {
  return (
    <Link
      href={"/dashboard/notifications"}
      className="rounded-full p-2 hover:bg-secondary"
    >
      <BellDot />
    </Link>
  )
}
