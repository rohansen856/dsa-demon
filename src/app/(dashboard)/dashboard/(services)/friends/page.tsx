import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { Friendslist } from "./components/friends-list"
import { SearchUser } from "./components/search-user"

export default async function Friends() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  // Find all the friend.
  const friends = await db.friends.findMany({
    where: {
      OR: [{ userId: user.id }, { friendId: user.id }],
    },
  })

  const friendIds = friends.map((friend) => ({
    id: friend.friendId === user.id ? friend.userId : friend.friendId,
  }))

  const allUsers = await db.user.findMany({
    where: { OR: [...friendIds] },
  })

  return (
    <div className="flex grid-cols-3 flex-col-reverse gap-4 lg:grid">
      <div className="col-span-2">
        <Friendslist friends={allUsers} />
      </div>
      <div className="col-span-1 flex max-h-[50vh] flex-col items-center rounded-lg bg-secondary p-4">
        <SearchUser />
      </div>
    </div>
  )
}
