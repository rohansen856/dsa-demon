"use client"

import { useMutation } from "@tanstack/react-query"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    difficulty: "All",
    uv: 4000,
    pv: 2400,
  },
  {
    difficulty: "Hard",
    uv: 4000,
    pv: 2400,
  },
  {
    difficulty: "Medium",
    uv: 3000,
    pv: 1398,
  },
  {
    difficulty: "Easy",
    uv: 2000,
    pv: 9800,
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function LeetcodeQuestionsGraph() {
  const { isPending, isError } = useMutation({
    mutationFn: async () => {},
  })

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="difficulty" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill={COLORS[1]} />
      <Bar dataKey="uv" fill={COLORS[2]} />

      <Tooltip />
      <Legend />
    </BarChart>
  )
}
