// components/form/LabeledInput.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormFieldProps } from "aiqna_common_v1";

import { Button } from "../ui/button";

interface FormInputFetchIdProps {
  info: TFormFieldProps;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  update?: (value: string | null | undefined) => void;
  clear?: (value: string | null | undefined) => void;
  fetchData?: (value: string) => Promise<void>;
}

export function FormInputFetchId({
  info,
  value,
  defaultValue,
  disabled = false,
  onChange,
  update,
  clear,
  fetchData,
}: FormInputFetchIdProps) {
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
      {fetchData && (
        <Button variant="outline" onClick={() => fetchData(value || "")} disabled={disabled}>
          Fetch Data
        </Button>
      )}
    </div>
  );
}
