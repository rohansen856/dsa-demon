"use client"

import { useState } from "react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface GroupJoinButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  groupId: string
}

export function GroupJoinButton({ groupId, ...props }: GroupJoinButtonProps) {
  const [isLoading, setLoading] = useState(false)

  async function joinGroup() {
    setLoading(true)
    try {
      const response = await axios.post(`/api/group/${groupId}`)
      if (response.status === 200)
        return toast({
          title: "Group Joined!",
          description: "refresh to see changes.",
        })

      if (response.status === 203)
        return toast({
          title: "Already a menber!",
          description: "You are already a member of the group!",
        })
      return toast({
        title: "Couldn't join Group",
        variant: "destructive",
        description: `Unable to join the group. Try again later.`,
      })
    } catch (error) {
      return toast({
        title: "Server error!",
        variant: "destructive",
        description: "There was an error updating your profile",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        joinGroup()
      }}
    >
      {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.add />}
    </Button>
  )
}
