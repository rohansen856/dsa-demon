import { Friendslist } from "./components/friends-list"
import { SearchUser } from "./components/search-user"

export default async function Friends() {
  return (
    <div className="flex grid-cols-3 flex-col-reverse gap-4 lg:grid">
      <div className="col-span-2 p-4">
        <Friendslist />
      </div>
      <div className="col-span-1 flex flex-col items-center bg-secondary p-4">
        <SearchUser />
      </div>
    </div>
  )
}
