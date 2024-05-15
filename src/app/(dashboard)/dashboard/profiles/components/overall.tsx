"use client"

import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts"

const data = [
  { name: "Leetcode", value: 400 },
  { name: "Codechef", value: 300 },
  { name: "Codeforces", value: 300 },
]
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function OverallSolved() {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        cx={125}
        cy={125}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}
