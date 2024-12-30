"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartCardProps {
  chartData: Array<{ name: string; total: number; fill: string }>;
  chartConfig: Record<string, { label: string; color: string }>;
  title: string;
  desc: string;
}

export function BarGraph({
  chartData,
  chartConfig,
  title,
  desc,
}: ChartCardProps) {
  return (
    <Card className="transition-transform duration-200 hover:shadow-lg hover:border-gray-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px]">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
