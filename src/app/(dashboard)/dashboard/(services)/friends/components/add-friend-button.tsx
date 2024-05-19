import { useState } from "react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface AddFriendButtonProps {
  id: string
}

export function AddFriendButton({ id }: AddFriendButtonProps) {
  const [isLoading, setLoading] = useState(false)
  async function addFriend() {
    setLoading(true)
    try {
      const { status } = await axios.post("/api/friends", { id })
      if (status === 202)
        return toast({
          title: "Friend Added",
          description: "Refresh to see updated friends list",
        })
      return toast({
        title: "Already Friends",
        variant: "destructive",
        description: "You are already friends!",
      })
    } catch (error) {
      return toast({
        title: "Error adding friend",
        variant: "destructive",
        description: "Could not add friend. Please try again later",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={addFriend} disabled={isLoading}>
      Add Friend{" "}
      {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.add />}
    </Button>
  )
}
