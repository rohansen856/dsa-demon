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
      <div className="space-y-4">
        <div className="col-span-1 flex max-h-[35vh] flex-col items-center rounded-lg bg-secondary p-4">
          <SearchUser />
        </div>
        <div className="flex w-full justify-evenly gap-2 rounded-lg bg-secondary p-2">
          <span className="flex-1 rounded-lg bg-background p-2 cursor-pointer">
            Pending: 0
          </span>
          <span className="flex-1 rounded-lg bg-background p-2 cursor-pointer">
            Requests: 0
          </span>
        </div>
      </div>
    </div>
  )
}
