import { ItemCard } from "./item-card"
import { ListCardProps, ListLayoutProps } from "./types"

export async function ListLayout({ list }: { list: ListLayoutProps[] }) {
  return (
    <div className="grid grid-cols-3">
      <ItemCard />
      {list.map((item) => (
        <ItemCard />
      ))}
    </div>
  )
}
