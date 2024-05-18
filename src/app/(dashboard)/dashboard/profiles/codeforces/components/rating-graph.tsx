"use client"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface CodeforcesRatingGraphProps {
  maxRating: number
  data: {
    contestName: string
    newRating: number
  }[]
}

export function CodeforcesRatingGraph(props: CodeforcesRatingGraphProps) {
  const { data } = props
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="contestName" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip labelClassName="text-black" />
      <Legend />
      <Line type="monotone" dataKey="newRating" stroke="#82ca9d" />
      <ReferenceLine y={props.maxRating} label="Max" stroke="red" />
    </LineChart>
  )
}
