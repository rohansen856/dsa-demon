import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userNameSchema } from "@/lib/validations/user"

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || !session.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = body as { profile: string; username: string }

    // Find if the profile exists.
    const profile = await db.profile.findFirst({
      where: { userId: session.user.id },
    })

    // Create and insert
    if (!profile)
      await db.profile.create({
        data: {
          userId: session.user.id,
          codeforces: payload.profile,
        },
      })

    await db.profile.update({
      where: { userId: session.user.id },
      data: {
        codeforces: payload.username,
        updatedAt: new Date().toISOString(),
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || !session.user.id) {
      return new Response(null, { status: 403 })
    }

    // Find if the profile exists.
    const profile = await db.profile.findFirst({
      where: { userId: session.user.id },
      select: { codeforces: true },
    })

    if (!profile || !profile.codeforces)
      return new Response(null, { status: 200 })

    return new Response(JSON.stringify(profile), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
