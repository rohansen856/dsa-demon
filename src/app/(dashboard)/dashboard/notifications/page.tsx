import { NotificationList } from "./components/notification-list"

export default function Notifications() {
  return (
    <div className="flex gap-4">
      <NotificationList />
      <div className="h-60 grow bg-secondary"></div>
    </div>
  )
}
