"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const profiles = [
  {
    title: "Overall",
    href: "/dashboard/profiles",
  },
  {
    title: "Leetcode",
    href: "/dashboard/profiles/leetcode",
  },
  { title: "Codechef", href: "/dashboard/profiles/codechef" },
  { title: "Codeforces", href: "/dashboard/profiles/codeforces" },
]

export function ProfileTabButton() {
  const path = usePathname()
  return (
    <div className="flex shrink gap-2 rounded-lg bg-secondary p-2">
      {profiles.map((ids) => (
        <Link
          href={ids.href}
          className={cn(
            buttonVariants(),
            "flex-1 bg-secondary text-foreground hover:bg-secondary",
            path?.toLowerCase() === ids.href.toLowerCase() &&
              "bg-background hover:bg-background"
          )}
        >
          {ids.title}
        </Link>
      ))}
    </div>
  )
}
