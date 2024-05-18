import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Manage your account from here."
      >
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div className="mb-6 flex flex-col items-start gap-6 rounded-lg">
        <Skeleton className="h-56 w-full rounded-lg" />
      </div>
    </DashboardShell>
  )
}
