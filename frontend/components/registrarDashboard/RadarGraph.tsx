"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieComponentProps {
  pieData: Array<{ name: string; total: number }>;
  title: string;
  desc: string;
}

export function RadarGraph({ pieData, title, desc }: PieComponentProps) {
  const chartConfig = {
    desktop: {
      label: "Total Students",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[600] max-h-[250px]"
        >
          <RadarChart data={pieData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-desktop] opacity-20" />
            <PolarAngleAxis dataKey="name" />
            <Radar
              dataKey="total"
              fill="var(--color-desktop)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
