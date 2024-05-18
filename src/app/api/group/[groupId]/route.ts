import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userNameSchema } from "@/lib/validations/user"

const routeContextSchema = z.object({
  params: z.object({
    groupId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || !session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const group = await db.groups.findFirst({
      where: { groupId: params.groupId },
    })

    return new Response(JSON.stringify(group), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || !session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const group = await db.groups.findMany({
      where: { groupId: params.groupId },
    })

    console.log(group)

    if (group.length < 1) {
      return new Response(JSON.stringify(null), { status: 404 })
    }

    const isAlreadyMember = group
      .map((member) => member.userId)
      .includes(session.user.id)

    if (isAlreadyMember) return new Response(null, { status: 203 })

    await db.groups.create({
      data: {
        userId: session.user.id,
        groupId: params.groupId,
        name: group[0].name,
        role: "member",
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
