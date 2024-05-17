import Link from "next/link"
import { EyeIcon, Link2 } from "lucide-react"

import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

type CardProps = React.ComponentProps<typeof Card>

interface UserCardProps extends CardProps {
  userid: string
  username: string
  image: string | null
  createdat: Date | null
}

export async function UserCard({ className, ...props }: UserCardProps) {
  const profile = await db.profile.findUnique({
    where: { userId: props.userid },
  })

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>
          <Avatar className="size-20">
            <AvatarImage
              src={props.image ?? "https://github.com/shadcn.png"}
              alt="@dsa-demon"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription className="flex justify-between gap-2 rounded-lg bg-secondary px-4 py-2">
          {props.username}
        </CardDescription>
        <CardContent>Since {props.createdat?.toDateString()}</CardContent>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Link
          href={profile?.leetcode ?? "/dashboard/compare"}
          className={cn(buttonVariants(), "flex-1")}
        >
          <Link2 className="mr-2 size-4" /> LC
        </Link>
        <Link
          href={profile?.codechef ?? "/dashboard/compare"}
          className={cn(buttonVariants(), "flex-1")}
        >
          <Link2 className="mr-2 size-4" /> CC
        </Link>
        <Link
          href={profile?.codeforces ?? "/dashboard/compare"}
          className={cn(buttonVariants(), "flex-1")}
        >
          <Link2 className="mr-2 size-4" /> CF
        </Link>
      </CardFooter>
    </Card>
  )
}
