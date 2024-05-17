import { Separator } from "@/components/ui/separator"

import { GroupsForm } from "./components/group-form"

export default function Groups() {
  return (
    <div className="flex w-full gap-4">
      <GroupsForm />
      <Separator orientation="vertical" />
    </div>
  )
}
