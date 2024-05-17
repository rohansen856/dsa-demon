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
    const payload = body as { id: string }

    // Find if the friend exists.
    const friend = await db.friends.findFirst({
      where: { userId: session.user.id, friendId: payload.id },
    })

    // Create and insert
    if (!friend) {
      await db.friends.create({
        data: {
          userId: session.user.id,
          friendId: payload.id,
        },
      })
      return new Response(null, { status: 202 })
    }

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

    // Find all the friend.
    const friends = await db.friends.findMany({
      where: {
        OR: [{ userId: session.user.id }, { friendId: session.user.id }],
      },
    })

    return new Response(JSON.stringify(friends), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || !session.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = body as { id: string }

    // Remove a friend
    await db.friends.deleteMany({
      where: {
        OR: [
          { userId: session.user.id, friendId: payload.id },
          { userId: payload.id, friendId: session.user.id },
        ],
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
