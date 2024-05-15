"use client"

import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const CustomizedLabel: React.FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={15} textAnchor="middle">
      {value}
    </text>
  )
}

const CustomizedAxisTick: React.FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="end"
        fill="#ddd"
        transform="rotate(-35)"
        fontSize={10}
      >
        {payload.value?.slice(10, 30)}
      </text>
    </g>
  )
}

interface RatingGraphProps {
  maxRating: number
  data: {
    contestName: string
    newRating: number
  }[]
}

export function RatingGraph(props: RatingGraphProps) {
  const { data } = props
  return (
    <LineChart
      className="rounded bg-secondary text-foreground"
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis
        dataKey="contestName"
        height={60}
        tick={<CustomizedAxisTick />}
        padding={{ left: 30, right: 30 }}
      />
      <YAxis />
      <Tooltip itemStyle={{ color: "blue" }} labelClassName="text-black" />
      <Legend />
      <Line type="monotone" dataKey="newRating" stroke="#00C49F">
        <LabelList content={<CustomizedLabel stroke="#ddd" />} />
      </Line>
      <ReferenceLine fill="#ddd" y={props.maxRating} label="Max" stroke="red" />
    </LineChart>
  )
}
