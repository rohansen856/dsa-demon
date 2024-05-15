import { ListLayout } from "./list-layout"
import { ListLayoutProps } from "./types"

export function DataStructuresList() {
  const items: ListLayoutProps[] = []
  return <ListLayout list={items} />
}
