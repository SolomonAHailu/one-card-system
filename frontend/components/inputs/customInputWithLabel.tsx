import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function CustomInputWithLabel({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form?.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start w-full">
          <FormLabel htmlFor={nameInSchema} className="text-base">
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
