import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || !session.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = body as { groupId: string }

    const data = await db.groups.findMany({
      where: {
        groupId: payload.groupId,
      },
      select: { userId: true, role: true },
    })

    const memberIds = data.map((user) => ({
      id: user.userId,
    }))

    const allMembers = await db.user.findMany({
      where: { OR: [...memberIds] },
    })

    return new Response(JSON.stringify(allMembers), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
