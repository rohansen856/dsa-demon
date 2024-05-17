import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CopyButton } from "@/components/shared/copy-button"

import { RemoveFriendButton } from "./remove-friend-button"

interface FriendslistProps {
  friends: {
    id: string | null
    image: string | null
    name: string | null
    createdAt: Date | null
  }[]
}

export function Friendslist({ friends }: FriendslistProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>
          List of all your coding buddies and friends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Since</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friends.map((friend) => (
              <TableRow className="cursor-pointer">
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full bg-secondary object-cover"
                    height="64"
                    src={friend.image ?? "https://github.com/shadcn.png"}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {friend.name ?? "no name"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">friend</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {friend.createdAt?.toDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {friend.id && (
                        <>
                          <DropdownMenuItem>
                            Copy id{" "}
                            <CopyButton
                              text={friend.id}
                              className="ml-2 size-8"
                            />{" "}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/compare/${friend.id}`}
                              className="size-full"
                            >
                              Compare
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RemoveFriendButton id={friend.id} />
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{friends.length}</strong> of{" "}
          <strong>{friends.length}</strong> friends
        </div>
      </CardFooter>
    </Card>
  )
}
