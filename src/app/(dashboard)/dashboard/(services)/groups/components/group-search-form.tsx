"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { GroupJoinButton } from "./group-join-button"

const FormSchema = z.object({
  groupId: z.string().min(4, {
    message: "Group Name must be at least 4 characters.",
  }),
})

export function GroupSearchForm() {
  const [isLoading, setLoading] = useState(false)
  const [group, setGroup] = useState<{ groupId: string; name: string } | null>(
    null
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      groupId: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    try {
      const response = await axios.get(`/api/group/${data.groupId}`)
      if (response.status === 200 && response.data !== null) {
        setGroup(response.data)
        return toast({
          title: "Group Found",
        })
      }
      return toast({
        title: "Group Not Found",
        variant: "destructive",
        description: `We were unable to find the group`,
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
    <div className="space-y-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="groupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Find Group</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="enter group id" {...field} />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <Icons.spinner className="animate-spin" />
                      ) : (
                        "Find"
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {isLoading ? (
        <Skeleton className="h-16 w-full bg-secondary" />
      ) : (
        group && (
          <div className="flex w-full cursor-pointer items-center gap-4 rounded-lg border p-2 hover:bg-secondary">
            <Avatar className="size-12 border border-white bg-secondary">
              <AvatarImage
                src={`/images/avatars/coder (1).png`}
                alt={group.name}
              />
              <AvatarFallback>
                <Icons.spinner className="animate-spin" />
              </AvatarFallback>
            </Avatar>
            <span className="">
              <p className="text-lg">{group.name}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                {group.groupId}{" "}
              </p>
            </span>
            <GroupJoinButton groupId={group.groupId} />
          </div>
        )
      )}
    </div>
  )
}
