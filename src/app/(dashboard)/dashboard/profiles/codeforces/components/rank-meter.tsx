"use client"

import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

const RADIAN = Math.PI / 180
const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042"]
const ratingsData = [
  { name: "newbie", value: 1199, color: COLORS[0] },
  { name: "pupil", value: 1399, color: COLORS[1] },
  { name: "specialist", value: 1599, color: COLORS[2] },
  { name: "expert", value: 1899, color: COLORS[0] },
  { name: "candidate master", value: 2099, color: COLORS[1] },
]
const cx = 150
const cy = 150
const iR = 50
const oR = 100

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0
  data.forEach((v) => {
    total += v.value
  })
  const ang = 180.0 * (1 - value / total)
  const length = (iR + 2 * oR) / 3
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 5
  const x0 = cx + 5
  const y0 = cy + 5
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ]
}

interface RankMeterProps {
  rating: number
  rank: string
}

export function RankMeter({ rating, rank }: RankMeterProps) {
  const position = ratingsData.findIndex((el) => el.name === rank)
  const data = [
    ratingsData[position - 1],
    ratingsData[position],
    ratingsData[position + 1],
  ]
  if (position === 0) {
    data.shift()
    data.push(ratingsData[position + 2])
  }
  return (
    <PieChart width={300} height={200}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
        paddingAngle={2}
        label
        className="text-primary"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(rating, data, cx, cy, iR, oR, "#ff0000")}
      <Tooltip />
      <Legend />
    </PieChart>
  )
}
