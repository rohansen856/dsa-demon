import Link from "next/link"
import { EyeIcon, Link2 } from "lucide-react"

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

const notifications = []

type CardProps = React.ComponentProps<typeof Card>

interface ProfileCardProps extends CardProps {
  username: string
  url: string
}

export function ProfileCard({ className, ...props }: ProfileCardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>
          <Avatar className="size-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@dsa-demon" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription className="flex justify-between gap-2 rounded-lg bg-secondary px-4 py-2">
          {props.username}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <EyeIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Profile Visibility
            </p>
            <p className="text-sm text-muted-foreground">
              Make your provile visible to other users
            </p>
          </div>
          <Switch />
        </div>
        <div></div>
      </CardContent>
      <CardFooter>
        <Link href={props.url} className={cn(buttonVariants(), "w-full")}>
          <Link2 className="mr-2 size-4" /> Visit your profile
        </Link>
      </CardFooter>
    </Card>
  )
}
