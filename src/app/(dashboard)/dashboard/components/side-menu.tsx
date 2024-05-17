"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Book,
  Bot,
  Code2,
  Handshake,
  LifeBuoy,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
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
      label: "Dashboard",
      href: "/dashboard",
      icon: <SquareTerminal className="size-5" />,
    },
    {
      label: "Profiles",
      href: "/dashboard/profiles",
      icon: <Code2 className="size-5" />,
    },
    {
      label: "Friends",
      href: "/dashboard/friends",
      icon: <Handshake className="size-5" />,
    },
    {
      label: "Groups",
      href: "/dashboard/groups",
      icon: <Bot className="size-5" />,
    },
    {
      label: "Compare",
      href: "/dashboard/compare",
      icon: <Book className="size-5" />,
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
                    path === item.href && "bg-muted"
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
      <nav className="mt-auto grid gap-1 p-2 pb-10">
        <TooltipProvider>
          {" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={"/dashboard/billing"}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-lg",
                  path?.includes("/dashboard/billing") && "bg-muted"
                )}
                aria-label="Donate"
              >
                <LifeBuoy className="size-5" />
              </Link>
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
              <Link
                href={"/dashboard/settings"}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-lg",
                  path?.includes("/dashboard/billing") && "bg-muted"
                )}
                aria-label="Settings"
              >
                <Settings2 className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </>
  )
}
