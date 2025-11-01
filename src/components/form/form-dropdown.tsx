// components/form/LabeledDropdown.tsx
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TFormFieldProps } from "aiqna_common_v1";

interface FormDropdownProps {
  info: TFormFieldProps;
  value: string;
  options: { value: string; label: string; name?: string | null }[];
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function FormDropdown({ info, value, options, disabled = false, onChange }: FormDropdownProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label htmlFor={info.id} className="min-w-[240px]">
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={(val) => onChange?.(val)} disabled={disabled}>
        <SelectTrigger id={info.id} className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
              {opt.name ? ` (${opt.name})` : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
