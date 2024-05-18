"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const FormSchema = z.object({
  groupname: z.string().min(4, {
    message: "Group Name must be at least 4 characters.",
  }),
})

export function GroupCreateForm() {
  const [isLoading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      groupname: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    try {
      const response = await axios.post(`/api/group`, data)
      if (response.status === 204)
        return toast({
          title: "Group Created",
          description: `Group ${data.groupname} has been created. Refresh to see changes`,
        })
      return toast({
        title: "Group Not Created",
        description: `We were unable to create group ${data.groupname}!`,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="groupname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Group</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input placeholder="enter group name" {...field} />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Icons.spinner className="animate-spin" />
                    ) : (
                      "Create"
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
  )
}
