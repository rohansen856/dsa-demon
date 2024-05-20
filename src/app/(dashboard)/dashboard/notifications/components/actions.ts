"use server"

import { db } from "@/lib/db"

export async function setAsRead(id: string) {
  await db.notifications.update({
    where: { id },
    data: { read: true },
  })
}
