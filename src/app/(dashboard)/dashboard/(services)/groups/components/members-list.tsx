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

interface MembersListProps {
  members: {
    id: string | null
    image: string | null
    name: string | null
    createdAt: Date | null
  }[]
}

export function MembersList({ members }: MembersListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>members</CardTitle>
        <CardDescription>List of all the group members.</CardDescription>
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
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow className="cursor-pointer">
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full bg-secondary object-cover"
                    height="64"
                    src={member.image ?? "https://github.com/shadcn.png"}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {member.name ?? "no name"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">member</Badge>
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
                      {member.id && (
                        <>
                          <DropdownMenuItem>
                            Copy id{" "}
                            <CopyButton
                              text={member.id}
                              className="ml-2 size-8"
                            />{" "}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/compare/${member.id}`}
                              className="size-full"
                            >
                              Compare
                            </Link>
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
          Showing <strong>1-{members.length}</strong> of{" "}
          <strong>{members.length}</strong> members
        </div>
      </CardFooter>
    </Card>
  )
}
