// components/form/LabeledInput.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormFieldProps } from "trand_common_v1";

import { Button } from "../ui/button";

interface FormInputProps {
  info: TFormFieldProps;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  update?: (value: string | null | undefined) => void;
  clear?: (value: string | null | undefined) => void;
}

export function FormInput({ info, value, defaultValue, disabled = false, onChange, update, clear }: FormInputProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label htmlFor={info.id} className="min-w-[240px]">
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
        {info.max_length && <span className="text-xs text-gray-500">({info.max_length})</span>}
      </Label>
      <Input
        id={info.id}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={info.placeholder}
      />
      {update && clear && (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => update(value)} disabled={disabled}>
            Update
          </Button>
          <Button variant="outline" onClick={() => clear(value)} disabled={disabled}>
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
