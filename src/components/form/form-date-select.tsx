// components/form/LabeledInput.tsx
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TFormFieldProps } from "trand_common_v1";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

interface FormDateSelectProps {
  info: TFormFieldProps;
  date: string;
  disabled?: boolean;
  setDate?: (value: string) => void;
}

export function FormDateSelect({ info, date, disabled = false, setDate }: FormDateSelectProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label htmlFor={info.id} className="min-w-[240px]">
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(day) => setDate?.(day?.toISOString() || "")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
