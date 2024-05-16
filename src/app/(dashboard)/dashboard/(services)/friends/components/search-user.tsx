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
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const FormSchema = z.object({
  userId: z.string().min(2, {
    message: "Invalid user id.",
  }),
})

export function SearchUser() {
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useState<{
    image: string | null
    name: string | null
  } | null>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    try {
      const response = await axios.get(`/api/users/${data.userId}`)
      const result = response.data as {
        image: string | null
        name: string | null
      }
      console.log(response)
      if (!result)
        toast({
          title: "User Not Found!",
          variant: "destructive",
          description: "user not found! please check the userId again!",
        })
      setUser(result)
    } catch (error) {
      setUser(null)
      toast({
        title: "Error finding user!",
        variant: "destructive",
        description: "There was an error in the server! Please try again later",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Users</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      placeholder="ex. clw7osh9d0000peo1gad3ln8h"
                      {...field}
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <Icons.spinner className="animate-spin" />
                      ) : (
                        "Search"
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>Paste the user&apos; id here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {user && (
        <div className="mt-8 flex w-full items-center gap-6 rounded-lg bg-background p-4">
          <Avatar className="size-16">
            <AvatarImage
              src={user.image ?? "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
        </div>
      )}
    </div>
  )
}
