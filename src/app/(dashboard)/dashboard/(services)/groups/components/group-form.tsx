import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/shared/copy-button"

import { GroupCreateForm } from "./group-create-form"
import { GroupSearchForm } from "./group-search-form"

interface GroupsFormProps {
  groups: {
    groupId: string
    name: string
  }[]
}

export function GroupsForm({ groups }: GroupsFormProps) {
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
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              {groups.map((group) => (
                <div className="flex w-full cursor-pointer items-center gap-4 rounded-lg border p-2 hover:bg-secondary">
                  <span className="size-12 rounded-full border border-white bg-secondary"></span>
                  <span className="">
                    <p className="text-lg">{group.name}</p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      {group.groupId}{" "}
                      <CopyButton text={group.groupId} className="h-full" />
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
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
              <GroupSearchForm />
            </div>
            <div className="space-y-1">
              <GroupCreateForm />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
