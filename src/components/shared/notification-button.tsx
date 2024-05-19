import Link from "next/link"
import { Bell, BellDot } from "lucide-react"

import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

interface NotificationButton {
  userId: string
}

export async function NotificationButton({ userId }: NotificationButton) {
  const notifications = await db.notifications.count({
    where: { receiverId: userId },
  })
  return (
    <Link
      href={"/dashboard/notifications"}
      className={cn(
        "rounded-full p-2 hover:bg-secondary",
        notifications > 0 && "text-yellow-500"
      )}
    >
      {notifications > 0 ? (
        <span className="flex">
          <BellDot /> {"  "}
          <small>+{notifications}</small>
        </span>
      ) : (
        <Bell />
      )}
    </Link>
  )
}
