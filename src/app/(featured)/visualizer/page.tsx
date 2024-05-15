import { Separator } from "@/components/ui/separator"

import { DataStructuresList } from "./components/data-structured-list"

export default async function Visualizer() {
  return (
    <>
      <section className="mb-4 mt-10 flex flex-col items-center justify-center gap-3">
        <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl">
          CodeVizz
        </h1>
        <h2 className="text-md sm:text-xl md:text-2xl lg:text-3xl">
          Visualize various algorithms in real time!
        </h2>
        <Separator className="mx-2 max-w-7xl" />
      </section>
      <section
        id="data-structures"
        className="flex h-screen w-full items-center justify-center p-3"
      >
        <div className="size-full max-w-7xl p-2">
          <h3 className="text-md mb-4 sm:text-lg md:text-xl lg:text-2xl">
            Data Structures
          </h3>
          <DataStructuresList />
        </div>
      </section>
    </>
  )
}
