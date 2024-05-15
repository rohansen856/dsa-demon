import { ListLayout } from "./list-layout"
import { ListLayoutProps } from "./types"

export function AlgorithmsList() {
  const items: ListLayoutProps[] = []
  return <ListLayout list={items} />
}
