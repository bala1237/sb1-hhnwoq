"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { code: "400", count: 145, description: "Bad Request" },
  { code: "401", count: 234, description: "Unauthorized" },
  { code: "403", count: 84, description: "Forbidden" },
  { code: "404", count: 383, description: "Not Found" },
  { code: "429", count: 475, description: "Too Many Requests" },
  { code: "500", count: 176, description: "Internal Server Error" },
  { code: "503", count: 38, description: "Service Unavailable" },
];

export function ErrorRates() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="code"
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
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Status
                        </span>
                        <span className="font-bold text-sm">{data.code}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Count
                        </span>
                        <span className="font-bold text-sm">{data.count}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Description
                      </span>
                      <span className="block text-sm">
                        {data.description}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="count"
            fill="hsl(var(--destructive))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}