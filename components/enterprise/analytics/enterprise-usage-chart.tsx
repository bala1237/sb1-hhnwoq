"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2024-01", calls: 180 },
  { date: "2024-02", calls: 200 },
  { date: "2024-03", calls: 250 },
  { date: "2024-04", calls: 280 },
  { date: "2024-05", calls: 310 },
  { date: "2024-06", calls: 350 },
  { date: "2024-07", calls: 400 },
];

export function EnterpriseUsageChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
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
          tickFormatter={(value) => `${value}M`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="calls"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}