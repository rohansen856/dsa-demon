import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <div className="grid w-full flex-1 gap-12 p-4 md:grid-cols-[200px_1fr]">
      <Skeleton className="m-2 w-[200px]" />
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <DashboardShell>
          <DashboardHeader
            heading="Dashboard"
            text="Manage your account from here."
          />
          <Skeleton className="container h-[500px]" />
        </DashboardShell>
      </main>
    </div>
  )
}
