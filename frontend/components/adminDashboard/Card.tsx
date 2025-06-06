import { LucideIcon } from "lucide-react";
import React from "react";

export type CardProps = {
  label: string;
  amount: string;
  description: string;
  icon: LucideIcon;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm">{props.label}</p>
        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="flex w-full flex-col gap-3 rounded-xl border p-5 transition-transform duration-200 hover:shadow-lg hover:border-gray-200"
    />
  );
}
