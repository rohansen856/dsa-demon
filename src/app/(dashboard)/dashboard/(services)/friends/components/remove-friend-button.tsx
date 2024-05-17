"use client"

import axios from "axios"

import { toast } from "@/components/ui/use-toast"

interface RemoveFriendButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  id: string
}

export function RemoveFriendButton({ ...props }: RemoveFriendButtonProps) {
  async function removeFriend() {
    try {
      const resp = await axios.delete("/api/friends", {
        data: { id: props.id },
      })
      return toast({
        title: "User is unfriended!",
        description: "Refresh to see updated friends list",
      })
    } catch (error) {
      return toast({
        title: "Error removing friend!",
        variant: "destructive",
        description:
          "We could not process your request. Please try again later.",
      })
    }
  }
  return (
    <span onClick={removeFriend} className="size-full">
      Remove
    </span>
  )
}
