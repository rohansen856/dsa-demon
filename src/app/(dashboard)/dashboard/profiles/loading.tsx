import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardSettingsLoading() {
  return (
    <div className="mt-6 grid gap-10">
      <CardSkeleton />
    </div>
  )
}
