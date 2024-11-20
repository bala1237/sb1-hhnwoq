"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "2024-01-01", calls: 2500 },
  { date: "2024-01-02", calls: 3500 },
  { date: "2024-01-03", calls: 4500 },
  { date: "2024-01-04", calls: 3800 },
  { date: "2024-01-05", calls: 5000 },
  { date: "2024-01-06", calls: 4800 },
  { date: "2024-01-07", calls: 5500 },
];

export function ApiUsageChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
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
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
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