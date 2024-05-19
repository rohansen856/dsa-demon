import { NotificationListTile } from "./notification-list-tile"

export function NotificationList() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="max-h-screen w-[500px]">
      {items.map((item) => (
        <NotificationListTile />
      ))}
    </div>
  )
}
