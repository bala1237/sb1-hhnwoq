"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "2024-01", calls: 180000 },
  { date: "2024-02", calls: 200000 },
  { date: "2024-03", calls: 250000 },
  { date: "2024-04", calls: 280000 },
  { date: "2024-05", calls: 310000 },
  { date: "2024-06", calls: 350000 },
  { date: "2024-07", calls: 400000 },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip 
          formatter={(value: number) => [`${value.toLocaleString()} calls`, "API Calls"]}
        />
        <Line
          type="monotone"
          dataKey="calls"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}