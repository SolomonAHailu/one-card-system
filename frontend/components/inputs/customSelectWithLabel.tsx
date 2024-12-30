import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StateOptions = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  fieldTitle: string;
  className?: string;
  nameInSchema: string;
  data: StateOptions[];
};

export default function CustomSelectWithLabel({
  className = "",
  data,
  nameInSchema,
  fieldTitle,
}: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start w-full">
          <FormLabel htmlFor={nameInSchema} className="text-base">
            {fieldTitle}
          </FormLabel>
          <Select
            value={field.value?.toString() || ""}
            onValueChange={(value) => field.onChange(Number(value))}
          >
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={`w-full h-10 ${className}`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item) => (
                <SelectItem
                  key={`${nameInSchema}_${item.id}`}
                  value={item.id.toString()}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
