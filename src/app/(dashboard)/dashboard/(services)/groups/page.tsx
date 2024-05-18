"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"

import { Skeleton } from "@/components/ui/skeleton"

import { MembersList } from "./components/members-list"

export default function Groups() {
  const [members, setMembers] = useState([])
  const params = useSearchParams()

  async function getMembers(id: string) {
    try {
      const { data } = await axios.post("/api/group/members", { groupId: id })
      setMembers(data)
    } catch (error) {
      setMembers([])
    }
  }

  useEffect(() => {
    const groupId = params?.get("groupId")
    if (groupId) getMembers(groupId)
  }, [params])

  if (params?.get("groupId") && members.length === 0)
    return <Skeleton className="w-full max-w-3xl grow" />

  if (members.length === 0) return

  return (
    <div className="flex w-full max-w-3xl grow gap-4 rounded-lg bg-secondary p-4">
      <MembersList members={members} />
    </div>
  )
}
