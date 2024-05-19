import { redirect } from "next/navigation"
import { Post, User } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { CodeforcesCompare } from "./components/codeforces-compare"
import { LeetcodeCompare } from "./components/leetcode-compare"
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
        The user you&apos;re trying to compare with haven&apos;t created his/her
        profile yet
      </p>
    )

  return (
    <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
      <UserCard
        userid={params.userId}
        username={data.name ?? "No name"}
        image={data.image}
        createdat={data.createdAt}
      />
      <div className="grow space-y-10 rounded bg-secondary p-2">
        <h4 className="text-md 3xl:text-3xl text-center md:text-xl xl:text-2xl">
          Leetcode
        </h4>
        {userProfile.leetcode && opponentProfile.leetcode ? (
          <LeetcodeCompare
            username={userProfile.leetcode}
            opponentname={opponentProfile.leetcode}
          />
        ) : (
          <p className="text-center">Profile not created yet!</p>
        )}
        <h4 className="text-md 3xl:text-3xl pt-12 text-center md:text-xl xl:text-2xl">
          Codeforces
        </h4>
        {userProfile.codeforces && opponentProfile.codeforces ? (
          <CodeforcesCompare
            username={userProfile.codeforces}
            opponentname={opponentProfile.codeforces}
          />
        ) : (
          <p className="text-center">Profile not created yet!</p>
        )}
      </div>
    </div>
  )
}
