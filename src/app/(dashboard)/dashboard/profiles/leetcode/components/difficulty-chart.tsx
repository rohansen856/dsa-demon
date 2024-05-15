"use client"

import { Cell, Legend, Pie, PieChart, Sector, Tooltip } from "recharts"

const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042"]

interface DifficultyChartProps {
  hard: number
  medium: number
  easy: number
}

export function DifficultyChart(props: DifficultyChartProps) {
  const data = [
    { name: "Hard", value: props.hard },
    { name: "Medium", value: props.medium },
    { name: "Easy", value: props.easy },
  ]
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
      <Legend />
    </PieChart>
  )
}
