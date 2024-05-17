import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GroupsForm() {
  return (
    <Tabs defaultValue="your groups" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="your groups">Your Groups</TabsTrigger>
        <TabsTrigger value="joinOrCreate">Join / Create</TabsTrigger>
      </TabsList>
      <TabsContent value="your groups">
        <Card>
          <CardHeader>
            <CardTitle>
              <Input placeholder="Find groups" />
            </CardTitle>
            <CardDescription>Filter groups by name</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="joinOrCreate">
        <Card>
          <CardHeader>
            <CardTitle>Join or Create a group</CardTitle>
            <CardDescription>
              join an existing group or create one
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="current">Find group</Label>
              <Input id="current" type="text" placeholder="Enter group id" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Create group</Label>
              <Input id="new" type="text" placeholder="Enter group name" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
