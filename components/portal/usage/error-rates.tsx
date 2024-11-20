"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ErrorRatesProps {
  errors: Array<{
    code: string;
    count: number;
    description: string;
  }>;
}

export function ErrorRates({ errors }: ErrorRatesProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={errors}>
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