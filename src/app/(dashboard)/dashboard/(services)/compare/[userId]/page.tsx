import { redirect } from "next/navigation"
import { Post, User } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { LeetcodeQuestionsGraph } from "./components/leetcode-questions-graph"
import { UserCard } from "./components/user-card"

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { userId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const data = await db.user.findUnique({
    where: { id: params.userId },
  })

  if (!data) {
    return "user not found"
  }

  const userProfile = await db.profile.findUnique({
    where: { userId: user.id },
  })

  const opponentProfile = await db.profile.findUnique({
    where: { userId: params.userId },
  })

  if (!userProfile)
    return (
      <p className="text-center">You haven&apos;t created your profile yet</p>
    )
  if (!opponentProfile)
    return (
      <p className="text-center">
        The user you&apos; are trying to compare with haven&apos;t created
        his/her profile yet
      </p>
    )

  return (
    <div className="flex w-full flex-wrap items-center gap-6">
      <UserCard
        userId={params.userId}
        username={data.name ?? "No name"}
        image={data.image}
        createdAt={data.createdAt}
      />
      <div className="space-y-10 bg-secondary p-2">
        <h4 className="text-md 3xl:text-3xl text-center md:text-xl xl:text-2xl">
          Leetcode
        </h4>
        <div className="flex grow flex-wrap items-center justify-around">
          <div>
            <LeetcodeQuestionsGraph />
            <p className="text-center">Solved questions</p>
          </div>
          <div>
            <LeetcodeQuestionsGraph />
            <p className="text-center">Total Submissions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
