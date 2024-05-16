"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Book,
  Bot,
  Code2,
  LifeBuoy,
  Settings2,
  SquareTerminal,
  SquareUser,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Sidemenu() {
  const path = usePathname()

  const menuItems = [
    {
      label: "Playground",
      href: "/dashboard",
      icon: <SquareTerminal className="size-5" />,
    },
    {
      label: "Friends",
      href: "/dashboard/friends",
      icon: <Bot className="size-5" />,
    },
    {
      label: "Api",
      href: "/dashboard",
      icon: <Code2 className="size-5" />,
    },
    {
      label: "Book",
      href: "/dashboard",
      icon: <Book className="size-5" />,
    },
    {
      label: "Settings",
      href: "/dashboard",
      icon: <Settings2 className="size-5" />,
    },
  ]

  return (
    <>
      <nav className="grid gap-1 p-2">
        {menuItems.map((item) => (
          <TooltipProvider>
            {" "}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "rounded-lg",
                    path?.includes(item.href) && "bg-muted"
                  )}
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          {" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          {" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </>
  )
}
