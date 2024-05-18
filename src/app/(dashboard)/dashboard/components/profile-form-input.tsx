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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

interface ProfileInputFormProps {
  name: string
  label: string
  value: string | null
}

export function ProfileInputForm(props: ProfileInputFormProps) {
  const [isLoading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: props.value ?? "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    try {
      const response = await axios.post(`/api/profiles/${props.name}`, {
        ...data,
        profile: props.name,
      })
      if (response.status === 202)
        return toast({
          title: "Profile Updated",
          description: `Your ${props.label} profile data has been succesfully updated`,
        })
      if (response.status === 205)
        return toast({
          title: "Invalid Username",
          variant: "destructive",
          description: `This ${props.label} User does not exist`,
        })
      return toast({
        title: "Profile Not Updated",
        description: `We were unable to update your ${props.label} profile data`,
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.label}</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input placeholder="ex. rohansen856" {...field} />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Icons.spinner className="animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Enter your {props.name} username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
